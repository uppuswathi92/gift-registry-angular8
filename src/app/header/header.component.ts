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
        this.eventsService.getEventNotification().subscribe(name => this.handleResponse(name));

    }
    private handleResponse(name: Object): void {
        this.numberOfNotifications = name["results"];
    }
    ngOnInit() {}

    //redirects to otherevents page based on notifications
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
}