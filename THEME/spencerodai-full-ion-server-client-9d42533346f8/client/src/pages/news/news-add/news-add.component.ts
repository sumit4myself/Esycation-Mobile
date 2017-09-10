import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Contact, Feed } from '../../../shared/sdk';
import { CommonServices } from '../../../shared/services/common.service';
import { PlacesServices } from '../../../shared/services/places.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'news-add',
  templateUrl: 'news-add.html'
})
export class NewsAddModal implements OnInit {
  user: Contact
  feed: Feed;
  feedForm: FormGroup;
  images: Array<string>;
  location: string;
  slideOptions: any = {
    initialSlide: 0,
    loop: true,
    autoplay: 5000,
    pager: true,
    speed: 500
  };
  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    private fb: FormBuilder,
    private commonServices: CommonServices,
    private placesServices: PlacesServices,
    private imagePicker: ImagePicker,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.user = this.commonServices.currentUser;
    this.feed = this.params.get('feed');
    this.buildForm(this.feed);
  }

  buildForm(feed?: Feed) {
    this.feedForm = this.fb.group({
      id: [feed ? feed.id : null],
      type: [feed ? feed.type : 'news'],
      title: [feed ? feed.title : '', [<any>Validators.required]],
      subtitle: [feed ? feed.subtitle : ''],
      content: [feed ? feed.content : '', Validators.required],
      url: [feed ? feed.url : ''],
      created_at: feed ? feed.created_at : new Date(),
      created_by: feed ? feed.created_by : this.user.id,
      updated_at: feed ? feed.updated_at : new Date(),
      updated_by: feed ? feed.updated_by : this.user.id,
      contactId: feed ? feed.contactId : this.user.id,
      is_active: feed ? feed.is_active : true,
      is_deleted: feed ? feed.is_deleted : false,
      images: feed ? feed.images : [],
      location: feed ? feed.location : []
    });
    this.images = feed ? feed.images : []
  }

  /*
    add Images to feed. 
    this uses ionic native image picker http://ionicframework.com/docs/v2/native/image-picker/
  */
  addImages() {
    let options: ImagePickerOptions = {
      maximumImagesCount: 5,
      quality: 70,
      outputType: 1
    }
    this.imagePicker.getPictures(options).then((results) => {
      this.images = this.feedForm.value['images'] = results;
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }

  addLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.placesServices.GeocodebyCords([resp.coords.latitude, resp.coords.longitude])
        .subscribe(
        (response) => {
          console.log(response);
          this.location = response.results[1].geometry.location;
          this.feedForm.value['location'] = response.results[1].formatted_address;
        }, (error) => this.commonServices.showAlert('Login Error', error.message));
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  saveFeed({ value, valid }: { value: Feed, valid: boolean }) {
    if (valid) {
      if (value) {
        value.location = this.location;
        this.viewCtrl.dismiss(value);
      }
    } else {
      this.commonServices.showAlert('Form Validation Error', 'Make sure all required fields are valid')
    }
  }

}
