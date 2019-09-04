import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EventsService } from '../service/events.service';
import { DatePipe } from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '../header/header.component';
@Component({
  providers:[HeaderComponent ],
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  events:string[];
  eventDateTime: String = "";
  displaySpinner: Boolean = false;
  currentEvent: any;
  modalReference: any;
  closeResult: any;
  notifications: Boolean = false;
  numberOfNotifications: any = 0;
  //@ViewChild(HeaderComponent, {static: false}) headerComponent : HeaderComponent;
  constructor(private eventsService:EventsService,
  private datePipe: DatePipe, private modalService: NgbModal, private headerComponent : HeaderComponent) { }

  ngOnInit() {
	 this.getEvents();
	 //this.headerComponent.getNotifications();
	 this.getEventNotification();
  }
  
  getEventNotification(){
	  
	  this.eventsService.getEventNotification().subscribe(
                response => this.handleSuccessfulResponse(response),
            );
  }
  
  getEvents(){
	  this.displaySpinner = true;
	  this.eventsService.getEvents(sessionStorage.getItem('username')).subscribe(
     response =>this.handleSuccessfulResponse(response),
    );
  }
	handleSuccessfulResponse(response)
	{
		console.log(response.service);
		if(response.service == "getEvents"){
			this.displaySpinner = false;
			//dateTime= response.eventDate.split("at");
		//console.log(this.datePipe.transform(dateTime[0], 'fullDate'));
		console.log(response);
		for(let i=0;i<response.results.length;i++){
			var dateArray = response.results[i].eventDate.split(" at ");
			//console.log(response[i].eventDate.split(" at ")[0]);
			//console.log(new Date(dateArray[0]));
			var formattedDate = this.datePipe.transform(new Date(dateArray[0]), 'fullDate');
			response.results[i].eventDate = formattedDate + " at " + dateArray[1];
		}
		this.events = response.results;
		}else if(response.service === "deleteEvent"){
			this.displaySpinner = false;
			this.getEvents();
		}else if(response.service === "eventNotification"){
			console.log("eventNotifications"+response.results);
			if(response.results > 0){
				this.notifications = true;
				this.numberOfNotifications = response.results;
			}
		}
	}
	deleteEvent(content, event){
		/*this.displaySpinner = true;
		this.eventsService.deleteEvent(eventId).subscribe(
     response =>this.handleSuccessfulResponse(response),
    );*/
	this.currentEvent = event;
	this.modalReference = this.modalService.open(content);
this.modalReference.result.then((result) => {
  this.closeResult = `Closed with: ${result}`;
}, (reason) => {
  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});
	}
	

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }else if(reason === 'Ok click'){
		console.log("Ok click");
	}
	else {
      return  `with: ${reason}`;
    }
  }
  
  deleteCurrentEvent(){
	  this.displaySpinner = true;
		this.eventsService.deleteEvent(this.currentEvent.eventId).subscribe(
     response =>this.handleSuccessfulResponse(response),
    );
	  this.modalReference.close();
  }
}
