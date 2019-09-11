import { Component, OnInit } from '@angular/core';
import { EventsService } from '../service/events.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-upcoming-events',
    templateUrl: './upcoming-events.component.html',
    styleUrls: ['./upcoming-events.component.css']
})
export class UpcomingEventsComponent implements OnInit {
    events: string[];
    displaySpinner: Boolean = false;
    constructor(private eventsService: EventsService,
        private datePipe: DatePipe) {}

    ngOnInit() {
        this.getUpcomingEvents();
    }

    //get events are coming up in next 7 days
    getUpcomingEvents() {
        this.displaySpinner = true;
        this.eventsService.getUpcomingEvents().subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }

    //handle response from http service
    handleSuccessfulResponse(response) {
        if (response.service == "getUpcomingEvents") {
            this.displaySpinner = false;
            for (let i = 0; i < response.results.length; i++) {
                var dateArray = response.results[i].eventDate.split(" at ");
                var formattedDate = this.datePipe.transform(new Date(dateArray[0]), 'fullDate');
                response.results[i].eventDate = formattedDate + " at " + dateArray[1];
            }
            this.events = response.results;
        }
    }
}