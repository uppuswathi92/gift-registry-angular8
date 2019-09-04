import { Component, OnInit } from '@angular/core';
import { EventsService } from '../service/events.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-other-events',
  templateUrl: './other-events.component.html',
  styleUrls: ['./other-events.component.css']
})
export class OtherEventsComponent implements OnInit {
events:string[];
  eventDateTime: String = "";
  constructor(private eventsService:EventsService,
  private datePipe: DatePipe) { }

  ngOnInit() {
	  //String username = sessionStorage.getItem('username');
	  this.eventsService.getOtherEvents(sessionStorage.getItem('username')).subscribe(
     response =>this.handleSuccessfulResponse(response),
    );
	 this.eventsService.updateNotification().subscribe(
     response =>this.handleSuccessfulResponse(response),
    );
  }
  
  handleSuccessfulResponse(response)
	{
		if(response != null){
			if(response.service === "getOtherEvents"){
				for(let i=0;i<response.results.length;i++){
			var dateArray = response.results[i].eventDate.split(" at ");
			//console.log(response[i].eventDate.split(" at ")[0]);
			//console.log(new Date(dateArray[0]));
			var formattedDate = this.datePipe.transform(new Date(dateArray[0]), 'fullDate');
			response.results[i].eventDate = formattedDate + " at " + dateArray[1];
		}
		this.events = response.results;
			}
		}
		//dateTime= response.eventDate.split("at");
		//console.log(this.datePipe.transform(dateTime[0], 'fullDate'));
		console.log(response);
		
	}

}
