import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    constructor(private route: ActivatedRoute, private eventsService: EventsService,
        private datePipe: DatePipe) {
        this.route.queryParams.subscribe(params => {
            this.eventId = params['eventId'];
            if (params['event'] == 'other') {
                this.isOtherEvent = true;
            }
        });
    }

    ngOnInit() {
        this.eventsService.getEventById(this.eventId).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }
    handleSuccessfulResponse(response) {
        //dateTime= response.eventDate.split("at");
        //console.log(this.datePipe.transform(dateTime[0], 'fullDate'));
        console.log(response);
        if (response != null) {
            if (response.service === "getEventById") {
                for (let i = 0; i < response.results.length; i++) {
                    var dateArray = response.results[i].eventDate.split(" at ");
                    //console.log(response[i].eventDate.split(" at ")[0]);
                    //console.log(new Date(dateArray[0]));
                    var formattedDate = this.datePipe.transform(new Date(dateArray[0]), 'fullDate');
                    response.results[i].eventDate = formattedDate + " at " + dateArray[1];
                }
                this.events = response.results;
            }
        }

    }

}