import { Component, OnInit } from '@angular/core';
import { EventsService, Events } from '../service/events.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css','../../form-style.css']
})
export class AddEventComponent implements OnInit {
    event: Events = new Events("", "", "", "", "","");
    isUpdate: Boolean = false;
   // eventDate = { month: '0o1', day: '0o1', year: '1o9o7o0' };
//	eventDate = { month: parseInt('0o1'), day: parseInt('0o1'), year: parseInt('0o1') };
	eventDate = { month: 1, day: 1, year: 1970 };
    eventTime = { hour: 13, minute: 30 };
    submitted: Boolean = false;
    eventId: string = "";
	displaySpinner: Boolean = false;
	minDate : any;
    constructor(private eventsService: EventsService, private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(params => {
            this.eventId = params['eventId'];
			
            if (this.eventId) {
                this.isUpdate = true;
            }
        });
		const current = new Date();
  this.minDate = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
    day: current.getDate()
  };
    }
    ngOnInit() {
		this.setOnLoadDate();
        if (this.isUpdate) {
			this.displaySpinner = true;
            this.eventsService.getEventById(this.eventId).subscribe(
                response => this.handleSuccessfulResponse(response),
            );
        }
    }
	setOnLoadDate(){
            var date = new Date();
            this.eventDate = {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            };
	}
	
    addEvent(): void {
		this.submitted = true;
		if(this.event.eventName && this.event.eventAddress && this.eventDate && this.eventTime && this.event.eventMsg){
			this.displaySpinner = true;
        
        this.event.eventDate = (this.eventDate.month + "-" + this.eventDate.day + "-" + this.eventDate.year) + " at " + (this.eventTime.hour + ":" + this.eventTime.minute);

        this.eventsService.addEvent(this.event).subscribe(
            response => this.handleSuccessfulResponse(response));
		}
		
    }
    handleSuccessfulResponse(response) {
		console.log(response);
		if (response != null){
			if(response.service == "getEventById"){
			this.displaySpinner = false;
			this.event = response.results;
        if (response.results.eventDate) {
            var dateArray = response.results.eventDate.split(" at ");
            var date = new Date(dateArray[0]);
            var time = dateArray[1].split(":");
            this.eventTime = {
                hour: parseInt(time[0]),
                minute: parseInt(time[1])
            };
            this.eventDate = {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            };
        }
		}else if(response.service === "addEvent" || response.service === "updateEvent"){
			this.displaySpinner = false;
			this.router.navigate(['myevents']);
		}
		}
        
    }
	
	updateEvent(): void {
		console.log(this.event);		
        this.submitted = true;
		this.displaySpinner = true;
        this.event.eventDate = (this.eventDate.month + "-" + this.eventDate.day + "-" + this.eventDate.year) + " at " + (this.eventTime.hour + ":" + this.eventTime.minute);
		this.event.eventId = this.eventId;
		console.log(this.event);
        this.eventsService.updateEvent(this.event).subscribe(
            response => this.handleSuccessfulResponse(response));
    }
}