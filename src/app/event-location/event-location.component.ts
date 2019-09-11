declare const google: any;
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {} from '@agm/core/services/google-maps-types';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { EventsService } from '../service/events.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-event-location',
    templateUrl: './event-location.component.html',
    styleUrls: ['./event-location.component.css']
})
export class EventLocationComponent implements OnInit {
    latitude: number;
    longitude: number;
    eventLat: number;
    eventLng: number;
    eventId: string;
    origin: any;
    destination: any;
    geoCoder;
    address: string;
    @ViewChild('search', {
        static: false
    })
    public searchElementRef: ElementRef;
    constructor(private mapsAPILoader: MapsAPILoader, private eventsService: EventsService, private ngZone: NgZone, private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(params => {
            this.eventId = params['eventId'];
        });
    }

    //get latitude and logitude of the event address
    getEventLatLng() {
        this.eventsService.getLatLng(sessionStorage.getItem('eventAddress')).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }

    ngOnInit() {
        this.getEventLatLng();

        //load address as user types
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

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.getDirection();
                });
            });
        })
    }

    //set origin as event address and destination as user's address
    getDirection() {
        this.origin = {
                lat: this.latitude,
                lng: this.longitude
            },
            this.destination = {
                lat: this.eventLat,
                lng: this.eventLng
            }
    }

    //handle response from http service
    handleSuccessfulResponse(response) {
        this.eventLat = parseFloat(response.results[0].geometry.location.lat);
        this.eventLng = parseFloat(response.results[0].geometry.location.lng);
        this.latitude = parseFloat(response.results[0].geometry.location.lat);
        this.longitude = parseFloat(response.results[0].geometry.location.lng);
        this.getDirection();
    }

    //redirect to view event page
    viewEvent() {
        this.router.navigate(["viewevent"], {
            queryParams: {
                eventId: this.eventId,
                event: "other"
            }
        });
    }
}