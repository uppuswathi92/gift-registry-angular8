import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { EventsService } from '../service/events.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-view-event',
    templateUrl: './view-event.component.html',
    styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {
    eventId: string;
    events: string[];
    isOtherEvent: Boolean = false;
    responded: string = "no response";
    displaySpinner: Boolean = false;
    pastEvent: Boolean = false;
    constructor(private route: ActivatedRoute, private eventsService: EventsService,
        private datePipe: DatePipe, private router: Router) {
        this.route.queryParams.subscribe(params => {
            this.eventId = params['eventId'];
            this.validateUserForEvent();
            if (params['event'] == 'other') {
                this.isOtherEvent = true;
            }
        });
    }
    //validate if the user is authorized to view the event 
    validateUserForEvent() {
        this.eventsService.validateUserForEvent(localStorage.getItem("username"), this.eventId).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }
    ngOnInit() {
        this.getEventById();
        this.getRsvp();
    }

    //get event details based on the eventId in the url
    getEventById() {
        this.eventsService.getEventById(this.eventId).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }

    //get the response whether user is attending the event or not
    getRsvp() {
        this.eventsService.getRsvp(this.eventId).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }

    //update user's response
    updateRsvp(status) {
        this.displaySpinner = true;
        var response = (status === "yes") ? "attending" : "not attending";
        this.eventsService.updateRsvp(this.eventId, status).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }

    //redirect to event location screen where user can see event location on map
    getDirections(address) {
        sessionStorage.setItem("eventAddress", address);
        this.router.navigate(["eventlocation"], {
            queryParams: {
                eventId: this.eventId
            }
        });
    }

    //update user's response
    changeResponse() {
        this.responded = "no response";
    }

    //handle responses from http service
    handleSuccessfulResponse(response) {
        if (response != null) {
            if (response.service === "getEventById") {
                var dateArray = response.results.eventDate.split(" at ");
                var formattedDate = this.datePipe.transform(new Date(dateArray[0]), 'fullDate');
                response.results.eventDate = formattedDate + " at " + dateArray[1];
                this.events = response.results;
                if (dateArray[0] && new Date(dateArray[0]).getTime() < new Date().getTime()) {
                    this.pastEvent = true;
                }
            } else if (response.service === "getRsvp") {
                var results = response.results.split("-");
                this.responded = results[0];
            } else if (response.service === "updateRsvp") {
                this.displaySpinner = false;
                this.responded = response.results;
            } else if (response.service === "validateUserEvent") {
                if (!response.results) {
                    this.router.navigate(["myevents"], {});
                }
            }
        }

    }
}