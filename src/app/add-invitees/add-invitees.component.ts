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
    inviteeName: any;
    invitees = [{
        name: '',
        username: '',
        rsvp: ''
    }];
    names = [];
    //format typeahead
    formatter = (x: {
        name: string
    }) => x.name;
    constructor(private registryUserService: RegistryUserService, private route: ActivatedRoute, private eventsService: EventsService, private router: Router

    ) {
        this.route.queryParams.subscribe(params => {
            this.eventId = params['eventId'];
            this.validateUserForEvent();
        });
    }
    validateUserForEvent() {
        this.eventsService.validateUserForEvent(localStorage.getItem("username"), this.eventId).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }
    //get typeahead results for invitee name
    search = (text$: Observable < string > ) =>
    text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term === '' ? [] :
            this.names.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
    ngOnInit() {
        this.getInvitees();
        this.getUsers();
    }
    //get all users details for typeahead results
    getUsers(): void {
        this.registryUserService.getUsers().subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }

    //validates if invitee has already been added to display in typeahead
    validateInvitee(name): Boolean {
        for (let i = 0; i < this.invitees.length; i++) {
            if (this.invitees[i].name === name) {
                return true;
            }
        }
        return false;
    }

    //handles response from http service
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
                var index = this.names.indexOf(this.inviteeName);
                if (index > -1) {
                    this.names.splice(index, 1);
                }
                this.inviteeName = "";
                this.submitted = false;
                this.getInvitees();
                this.displaySpinner = false;
            } else if (response.service == "deleteInvitee") {
				this.displaySpinner = false;
                this.getInvitees();
            } else if (response.service === "validateUserEvent") {
                if (!response.results) {
                    this.router.navigate(["myevents"], {});
                }
            }
        }
    }

    //invoked on click of add invitee
    addInvitee(): void {
        this.submitted = true;
        if (this.inviteeName.username) {
            this.displaySpinner = true;
            this.eventsService.addInvitee(this.inviteeName.username, this.eventId).subscribe(
                response => this.handleSuccessfulResponse(response),
            );
        }
    }

    //gets invitees for current event to display list of invitees
    getInvitees(): void {
        this.eventsService.getInvitees(this.eventId).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }

    //invokes delete invitee service
    deleteInvitee(invitee): void {
		this.displaySpinner = true;
        this.names.push({
            name: invitee.name,
            username: invitee.username
        });
        this.eventsService.deleteInvitee(this.eventId, invitee.username).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }
}