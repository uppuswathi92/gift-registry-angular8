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
            if (params['event'] == 'other') {
                this.isOtherEvent = true;
            }
        });
    }

    ngOnInit() {
        this.eventsService.getEventById(this.eventId).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
		this.getRsvp();
    }
	getRsvp(){
		this.eventsService.getRsvp(this.eventId).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
	}
	updateRsvp(status){
		this.displaySpinner = true;
		var response = (status === "yes")? "attending": "not attending";
		this.eventsService.updateRsvp(this.eventId, status).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
	}
	getDirections(address){
		sessionStorage.setItem("eventAddress", address);
		this.router.navigate(["eventlocation"], {
                    queryParams: {
                        eventId: this.eventId
                    }
                });
	}
	changeResponse(){
		this.responded = "no response";
	}	
    handleSuccessfulResponse(response) {
        console.log(response);
        if (response != null) {
            if (response.service === "getEventById") {
                    var dateArray = response.results.eventDate.split(" at ");
                    var formattedDate = this.datePipe.transform(new Date(dateArray[0]), 'fullDate');
                    response.results.eventDate = formattedDate + " at " + dateArray[1];
					this.events = response.results;
					if(dateArray[0] && new Date(dateArray[0]).getTime() < new Date().getTime()){
						this.pastEvent = true;
					}
            }else if(response.service === "getRsvp"){
				this.responded = response.results;
			}else if(response.service === "updateRsvp"){
				this.displaySpinner = false;
				this.responded = response.results;
			}
        }

    }

}