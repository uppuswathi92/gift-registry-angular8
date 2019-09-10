import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { RegistryUser, RegistryUserService } from '../service/registry-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../service/events.service';
@Component({
    selector: 'app-add-invitees',
    templateUrl: './add-invitees.component.html',
    styleUrls: ['./add-invitees.component.css', '../../form-style.css']
})
export class AddInviteesComponent implements OnInit {
    eventId: string;
    submitted: Boolean = false;
	displaySpinner: Boolean = false;
    public inviteeName: any;
    invitees = [{
        name: '',
        username: '',
		rsvp: ''
    }];
    names = [];
    formatter = (x: {
        name: string
    }) => x.name;
    constructor(private registryUserService: RegistryUserService, private route: ActivatedRoute, private eventsService: EventsService, private router: Router

    ) {
        this.route.queryParams.subscribe(params => {
            this.eventId = params['eventId'];
        });
    }
    search = (text$: Observable < string > ) =>
    text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        /*map(term => term.length < 2 ? []
          : this.names.filter(v => v.name.toLowerCase().indexOf(term.name.toLowerCase()) > -1).slice(0, 10))*/
        map(term => term === '' ? [] :
            this.names.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
    ngOnInit() {
        this.getInvitees();
        this.getUsers();
    }
    getUsers(): void {
        this.registryUserService.getUsers().subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }
    validateInvitee(name): Boolean {
        for (let i = 0; i < this.invitees.length; i++) {
            if (this.invitees[i].name === name) {
                return true;
            }
        }
        return false;
    }
    handleSuccessfulResponse(response) {
        if (response) {
            if (response.service == "getUsers") {
                if (response.results.length > 0) {
                    this.names = [];
                    for (let i = 0; i < response.results.length; i++) {
                        let name = response.results[i].firstName + " " + response.results[i].lastName;
                        if (response.results[i].username != localStorage.getItem('username') && !this.validateInvitee(name)) {
                            this.names.push({
                                name: response.results[i].firstName + " " + response.results[i].lastName,
                                username: response.results[i].username
                            });
                        }
                    }
                }
            } else if (response.service == "getInvitees") {
                this.invitees = [];
                if (response.results.length > 0) {
                    for (let i = 0; i < response.results.length; i++) {
                        var nameArray = response.results[i].split("-");
                        var name = (nameArray.length > 0) ? nameArray[0] : "";
                        var username = (nameArray.length > 0) ? nameArray[1] : "";
						var rsvp = (nameArray.length > 0) ? nameArray[2] : "";
                        this.invitees.push({
                            name: name,
                            username: username,
							rsvp: rsvp
                        });
                    }
                }
            } else if (response.service == "addInvitees") {
                this.inviteeName = "";
                this.submitted = false;
                this.getInvitees();
                this.getUsers();
				this.displaySpinner = false;
            } else if (response.service == "deleteInvitee") {
                this.getInvitees();
                this.getUsers();
            }
        }
        if (response && response.length > 0) {

        }
    }
    addInvitee(): void {
        this.submitted = true;
        if (this.inviteeName.username) {
			this.displaySpinner = true;
            this.eventsService.addInvitee(this.inviteeName.username, this.eventId).subscribe(
                response => this.handleSuccessfulResponse(response),
            );
        }


    }
    getInvitees(): void {
        this.eventsService.getInvitees(this.eventId).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
        console.log(this.inviteeName);
        console.log(this.eventId);
    }
    deleteInvitee(username): void {
        this.eventsService.deleteInvitee(this.eventId, username).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }
    viewEvent() {
        this.router.navigate(["viewevent"], {
            queryParams: {
                eventId: this.eventId
            }
        });
    }
}