import { Component, OnInit } from '@angular/core';
import { EventsService } from '../service/events.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-other-events',
    templateUrl: './other-events.component.html',
    styleUrls: ['./other-events.component.css']
})
export class OtherEventsComponent implements OnInit {
    events: string[];
    eventDateTime: String = "";
    constructor(private eventsService: EventsService,
        private datePipe: DatePipe) {}

    ngOnInit() {
        this.getOtherEvents();
        this.updateNotification();

    }

    //get events user has been invited to
    getOtherEvents(): void {
        this.eventsService.getOtherEvents(localStorage.getItem('username')).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }

    //update that user has viewed all events user has been invited to
    updateNotification(): void {
        this.eventsService.updateNotification().subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }

    //handles response from http service
    handleSuccessfulResponse(response) {
        if (response != null) {
            if (response.service === "getOtherEvents") {
                for (let i = 0; i < response.results.length; i++) {
                    var dateArray = response.results[i].eventDate.split(" at ");
                    var formattedDate = this.datePipe.transform(new Date(dateArray[0]), 'fullDate');
                    response.results[i].eventDate = formattedDate + " at " + dateArray[1];
                }
                this.events = response.results;
            }
        }

    }

}
