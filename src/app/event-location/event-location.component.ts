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
eventId:string;
public origin: any;
public destination: any;

private geoCoder;
zoom: Number = 14;
address: string;
@ViewChild('search',{static: false})
  public searchElementRef: ElementRef;
  constructor(private mapsAPILoader: MapsAPILoader,private eventsService: EventsService, private ngZone: NgZone,private route: ActivatedRoute,private router: Router) {
this.route.queryParams.subscribe(params => {
            this.eventId = params['eventId'];
        });
	  }
getEventLatLng(){
		this.eventsService.getLatLng(sessionStorage.getItem('eventAddress')).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
}

  ngOnInit() {
	  //sessionStorage.setItem('eventAddress','1910 Barrymore Common, Fremont, CA');
	  this.getEventLatLng();
	 // this.getDirection();
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
          //this.zoom = 12;
        });
      });
    })
  }
  
getDirection() {
	this.origin = { lat: this.latitude, lng: this.longitude },
	this.destination= { lat: this.eventLat, lng: this.eventLng }
	//this.origin = { lat: this.latitude, lng: this.longitude };
  //this.destination = { lat: 24.799524, lng: 120.975017 };
}
handleSuccessfulResponse(response) {
	this.eventLat = parseFloat(response.results[0].geometry.location.lat);
	this.eventLng = parseFloat(response.results[0].geometry.location.lng);
	this.latitude =  parseFloat(response.results[0].geometry.location.lat);
	this.longitude =  parseFloat(response.results[0].geometry.location.lng);
	this.getDirection();
}
viewEvent(){
	this.router.navigate(["viewevent"], {
                    queryParams: {
                        eventId: this.eventId,
						event: "other"
                    }
                });
}
}
