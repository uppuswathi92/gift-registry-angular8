import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { EventsService } from '../service/events.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    numberOfNotifications: any;
    constructor(private eventsService: EventsService, private loginService: AuthenticationService, private router: Router) {
        console.log("here");
        this.eventsService.getEventNotification().subscribe(name => this.changeName(name));

    }
    private changeName(name: Object): void {
        this.numberOfNotifications = name["results"];
        console.log(this.numberOfNotifications);
    }
    ngOnInit() {
        /*this.eventsService.getEventNotification().subscribe(
        response => this.handleSuccessfulResponse(response),
        );*/
        //this.eventsService.numberOfNotifications();

    }
    redirectOtherEvents(): void {
        if (this.eventsService.numberOfNotifications() === 0) {
            this.router.navigate(["otherevents"]);
        } else {
            this.router.navigate(["otherevents"], {
                queryParams: {
                    new: this.eventsService.numberOfNotifications()
                }
            });
        }
    }
    getNotifications() {
        this.numberOfNotifications = 0;
        this.eventsService.getEventNotification().subscribe(
            response => this.handleSuccessfulResponse(response),
        );
        console.log(this.numberOfNotifications);
        return this.numberOfNotifications;
    }

    check() {
        console.log("in check");
    }
    handleSuccessfulResponse(response) {
        if (response != null) {
            if (response.service == "eventNotification") {
                console.log(response.results);
                this.numberOfNotifications = response.results;
            }
        }
    }
}