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
	/*noresponseEvents: string[] = [{eventAddress: "1910 Barrymore Common, Fremont, CA 94538, USA"
eventDate: "Monday, September 30, 2019 at 15:30"
eventId: "37419"
eventMsg: "please do attend"
eventName: "swathi's birthday"
formattedDate: "Monday, September 30, 2019"
host: false
	username: "william"}];*/
	noresponseEvents: string[] = new Array();
	notAttendingEvents: string[] = new Array();
	attendingEvents: string[] = new Array();
	pastEvents: string[] = new Array();
	/*attendingEvents: string[] = [{eventAddress: "1910 Barrymore Common, Fremont, CA 94538, USA"
eventDate: "Monday, September 30, 2019 at 15:30"
eventId: "37419"
eventMsg: "please do attend"
eventName: "swathi's birthday"
formattedDate: "Monday, September 30, 2019"
host: false
	username: "william"}];
	attendingEvents: string[] = [{eventAddress: "1910 Barrymore Common, Fremont, CA 94538, USA"
eventDate: "Monday, September 30, 2019 at 15:30"
eventId: "37419"
eventMsg: "please do attend"
eventName: "swathi's birthday"
formattedDate: "Monday, September 30, 2019"
host: false
	username: "william"}];*/
    eventDateTime: String = "";
	userResponse: String = "";
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
	//get the response whether user is attending the event or not
    getRsvp() {
		for(var i=0;i<this.events.length;i++){
			var selectedDate = this.events[i]["formattedDate"];
			var now = new Date();
			var dt1 = Date.parse(""+new Date()),
			dt2 = Date.parse(selectedDate);
		   if (dt2 < dt1) {
				this.pastEvents.push(this.events[i]);
		   }else{
			   this.eventsService.getRsvp(this.events[i]["eventId"]).subscribe(
            response => this.handleSuccessfulResponse(response),
			);
		   }
			
		}		
    }
    //handles response from http service
    handleSuccessfulResponse(response) {
        if (response != null) {
            if (response.service === "getOtherEvents") {
                for (let i = 0; i < response.results.length; i++) {
                    var dateArray = response.results[i].eventDate.split(" at ");
                    var formattedDate = this.datePipe.transform(new Date(dateArray[0]), 'fullDate');
                    response.results[i].eventDate = formattedDate + " at " + dateArray[1];
					response.results[i].formattedDate = formattedDate;
					/*var inputDate = new Date();
					//this.currentResponse = response.results[i];
					if(response.results[i].formattedDate < inputDate){
						this.pastEvents.push(response.results[i]);
					}else{
						this.getRsvp(response.results[i]);
					}*/
                }
				this.events = response.results;
				this.getRsvp();
				
				//console.log(this.noresponseEvents);
				/*this.noresponseEvents.sort((val1, val2)=> {return new Date(val1.formattedDate) - new 
						Date(val2.formattedDate)});
				this.notAttendingEvents.sort((val1, val2)=> {return new Date(val1.formattedDate) - new 
				Date(val2.formattedDate)});
				this.attendingEvents.sort((val1, val2)=> {return new Date(val1.formattedDate) - new 
				Date(val2.formattedDate)});*/
                
				console.log(response.results);
            }else if (response.service === "getRsvp") {
                
				var resp = response.results.split("-");
				var eId = resp[1];
				this.userResponse = resp[0];
				if(this.userResponse === "no response"){
						for(var i=0;i<this.events.length;i++){
							if(this.events[i]["eventId"] == eId){
							this.noresponseEvents.push(this.events[i]);
							this.noresponseEvents.sort((val1, val2)=> {return <any>new Date(val1["formattedDate"]) - <any>new Date(val2["formattedDate"]) });
							}
						}
					}else if(this.userResponse === "not attending"){
						for(var i=0;i<this.events.length;i++){
							if(this.events[i]["eventId"] == eId){
							this.notAttendingEvents.push(this.events[i]);
							this.notAttendingEvents.sort((val1, val2)=> {return <any>new Date(val1["formattedDate"]) - <any>new Date(val2["formattedDate"]) });
							}
						}
						
					}else if(this.userResponse === "attending"){
						for(var i=0;i<this.events.length;i++){
							if(this.events[i]["eventId"] == eId){
							this.attendingEvents.push(this.events[i]);
							this.attendingEvents.sort((val1, val2)=> {return <any>new Date(val1["formattedDate"]) - <any>new Date(val2["formattedDate"]) });
							}
						}
						
					}
            }
        }

    }

}

//doc with usecases
//class and sequence diagram
//source code, db folder
