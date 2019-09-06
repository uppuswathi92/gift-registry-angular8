import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
export class Events {
    constructor(
        public eventId: string,
        public eventName: string,
        public eventAddress: string,
        public eventDate: string,
        public username: string,
        public eventMsg: string
    ) {}
}

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    notifications: any;
    constructor(
        private httpClient: HttpClient
    ) {}
    public addEvent(event) {
        /*let params = new HttpParams();
	params = params.append('Events', event);
	console.log(event.eventName);
	const body = {events: event, username: localStorage.getItem('username')};
	let username = localStorage.getItem('username');
    params = params.append('username', localStorage.getItem('username'));*/
        event.username = localStorage.getItem('username');
        return this.httpClient.post < Object > ("http://localhost:8080/events", event);
    }
    getEvents(username) {
        return this.httpClient.get < Events > ('http://localhost:8080/events/' + username);
    }
    getEventById(eventId) {
        return this.httpClient.get < Events > ('http://localhost:8080/events?eventId=' + eventId);
    }

    addInvitee(username, eventId) {
        return this.httpClient.get < String > ('http://localhost:8080/giftregistry/addInvitee?eventId=' + eventId + '&username=' + username);
    }
    public updateEvent(event) {
        /*let params = new HttpParams();
	params = params.append('Events', event);
	console.log(event.eventName);
	const body = {events: event, username: localStorage.getItem('username')};
	let username = localStorage.getItem('username');
    params = params.append('username', localStorage.getItem('username'));*/
        return this.httpClient.post < String > ("http://localhost:8080/events/updateEvent", event);
    }

    getInvitees(eventId) {
        return this.httpClient.get < Object > ('http://localhost:8080/events/getInvitees/' + eventId);
    }
    getOtherEvents(username) {
        return this.httpClient.get < Events > ('http://localhost:8080/events/otherEvents/' + username);
    }
    public deleteEvent(eventId) {
        return this.httpClient.delete < Object > ("http://localhost:8080/events/deleteEvent/" + eventId);
    }
    public deleteInvitee(eventId, username) {
        return this.httpClient.delete < Object > ("http://localhost:8080/events/deleteInvitee/" + eventId + "/" + username);
    }
    public getEventNotification() {
        return this.httpClient.get < Object > ('http://localhost:8080/events/eventNotifications/' + localStorage.getItem('username'));
    }
    public updateNotification() {
        return this.httpClient.post < Object > ("http://localhost:8080/events/updateNotification", localStorage.getItem('username'));
    }
    public numberOfNotifications() {
        this.notifications = 0;
        this.getEventNotification().subscribe(
            response => this.handleSuccessfulResponse(response));
        console.log(this.notifications);
        return this.notifications;
    }
    handleSuccessfulResponse(response) {
        console.log(response);
        if (response != null) {
            if (response.service === "eventNotification") {
                this.notifications = response.results;
            }
        }
    }
}