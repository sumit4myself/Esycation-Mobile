import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavParams, PopoverController, ViewController } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { Contact } from '../../../shared/sdk/';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;

@Component({
  selector: 'dashboard-map',
  templateUrl: 'dashboard-map.html'
})
export class DashboardMapComponent implements OnInit {

  user:Contact
  @ViewChild('map') mapElement: ElementRef;
  placesService: any;
  map: any;
  markers = [];
  autocompleteResults: any[] = [];
  search: string = '';
  acService: any = new google.maps.places.AutocompleteService();;
  latLng: any;
  type: string = 'geocode';
  radius: number = 500;

  constructor(
    private popoverCtrl: PopoverController,
    private commonServices: CommonServices,
    private geolocation: Geolocation
  ) {
    this.user = commonServices.currentUser;
    this.type = this.user.preference.mapType;
    this.radius = this.user.preference.mapRadius;
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
    }
      , (err) => {
        console.log(err);
      });
  }

  getPlaceDetail(place_id: string): void {
    let self = this;
    var request = {
      placeId: place_id
    };
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.placesService.getDetails(request, callback);
    function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        self.map.setCenter(place.geometry.location);
        self.createMapMarker(place);
      } else {
        console.log('page > getPlaceDetail > status > ', status);
      }
    }
  }

  createMapMarker(place: any): void {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.map,
      position: placeLoc
    });
    this.markers.push(marker);
    let content = '<h5 class="info-window">' + place.formatted_address + '</h5>';
    this.addInfoWindow(marker, content);
  }

  chooseItem(item: any) {
    let self = this;
    self.autocompleteResults = [];
    if (item) {
      self.getPlaceDetail(item.place_id);
    }
  }

  searchPlace(ev) {
    let self = this;
    let val = ev.target.value;
    if (val == '') {
      this.autocompleteResults = [];
      return;
    }
    let config = {};
    if (val) {
      config = {
        types: [self.type], // other types available in the API: 'establishment', 'regions', and 'cities'
        input: val,
        location: this.latLng,
        radius: self.radius
      }
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
      console.log('modal > getPlacePredictions > status > ', status);
      self.autocompleteResults = [];
      predictions.forEach(function (prediction) {
        self.autocompleteResults.push(prediction);
      });
    });
  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    let content = '<h5 class="info-window">Current Location</h5>';
    this.addInfoWindow(marker, content);

  }
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  presentPopover(ev) {
    let self = this;
    let popover = this.popoverCtrl.create(MapOptionsPopover, { type: self.type, radius: self.radius }, { enableBackdropDismiss: false });
    popover.onDidDismiss(data => {
      this.radius = data.radius;
      this.type = data.type;
    });
    popover.present({
      ev: ev
    });
  }
}

@Component({
  template: `
  <div padding>
  <ion-list>
  <ion-item>
    <ion-label>Type</ion-label>
    <ion-select [(ngModel)]="type">
      <ion-option value="establishment">Establishment</ion-option>
      <ion-option value="geocode">Geocode</ion-option>
      <ion-option value="regions">Regions</ion-option>
      <ion-option value="cities">Cities</ion-option>
    </ion-select>
  </ion-item>
  <ion-item>
    <ion-label fixed>Radius</ion-label>
    <ion-input type="number" [(ngModel)]="radius"></ion-input>
  </ion-item>
</ion-list>
<button ion-button block (click)="close({type:type, radius: radius})">Save & Close</button>
</div>
  `
})
export class MapOptionsPopover {
  type: string;
  radius: number
  constructor(private navParams: NavParams,
    private viewCtrl: ViewController) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.type = this.navParams.data.type;
      this.radius = this.navParams.data.radius;
    }
  }
  close(data) {
    this.viewCtrl.dismiss(data);
  }


}
