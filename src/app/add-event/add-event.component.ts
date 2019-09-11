declare const google: any;
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { EventsService, Events } from '../service/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css', '../../form-style.css']
})
export class AddEventComponent implements OnInit {
    event: Events = new Events("", "", "", "", "", "", false);
    isUpdate: Boolean = false;
    eventDate = {
        month: 1,
        day: 1,
        year: 1970
    };
    eventTime = {
        hour: 13,
        minute: 30
    };
    submitted: Boolean = false;
    eventId: string = "";
    displaySpinner: Boolean = false;
    minDate: any;
    geoCoder;
    //selector for location search
    @ViewChild('search', {
        static: false
    })
    public searchElementRef: ElementRef;
    constructor(private mapsAPILoader: MapsAPILoader, private eventsService: EventsService, private ngZone: NgZone, private route: ActivatedRoute, private router: Router) {
        //getting eventId from query parameter
        this.route.queryParams.subscribe(params => {
            this.eventId = params['eventId'];
            if (this.eventId) {
                this.isUpdate = true;
            }
        });
        const current = new Date();
        //setting minimum date in calendar
        this.minDate = {
            year: current.getFullYear(),
            month: current.getMonth() + 1,
            day: current.getDate()
        };
    }
    ngOnInit() {
        this.setOnLoadDate();
        //if it is event update, retrieve details from to display
        if (this.isUpdate) {
            this.displaySpinner = true;
            this.eventsService.getEventById(this.eventId).subscribe(
                response => this.handleSuccessfulResponse(response),
            );
        }
        this.searchLocation();
    }
    //populate location in event address input as user types
    searchLocation(): void {
        this.mapsAPILoader.load().then(() => {
            this.geoCoder = new google.maps.Geocoder;

            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    this.event.eventAddress = place.formatted_address;
                });
            });
        })
    }

    //set default date on load
    setOnLoadDate(): void {
        var date = new Date();
        this.eventDate = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    }

    //invoked on click of add event
    addEvent(): void {
        this.submitted = true;
        if (this.event.eventName && this.event.eventAddress && this.eventDate && this.eventTime && this.event.eventMsg) {
            this.displaySpinner = true;

            this.event.eventDate = (this.eventDate.month + "-" + this.eventDate.day + "-" + this.eventDate.year) + " at " + (this.eventTime.hour + ":" + this.eventTime.minute);

            this.eventsService.addEvent(this.event).subscribe(
                response => this.handleSuccessfulResponse(response));
        }
    }

    //handles response from http service`
    handleSuccessfulResponse(response) {
        if (response != null) {
            if (response.service == "getEventById") {
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
            } else if (response.service === "addEvent" || response.service === "updateEvent") {
                this.displaySpinner = false;
                this.router.navigate(['myevents']);
            }
        }
    }

    //invoked on click of update event
    updateEvent(): void {
        this.submitted = true;
        this.displaySpinner = true;
        this.event.eventDate = (this.eventDate.month + "-" + this.eventDate.day + "-" + this.eventDate.year) + " at " + (this.eventTime.hour + ":" + this.eventTime.minute);
        this.event.eventId = this.eventId;
        this.eventsService.updateEvent(this.event).subscribe(
            response => this.handleSuccessfulResponse(response));
    }
}