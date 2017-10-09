import { Component } from '@angular/core';
import { NavController, ModalController, Loading, LoadingController,NavParams } from 'ionic-angular';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {UserPrefernce} from '../../../providers/model/common/UserPrefernce';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfileComponent {
  
  profileMenus: string = '_stories';
  loading: Loading;
  userDetails :UserPrefernce;
  id:number;
  constructor(
    private navCtrl: NavController,
    private userSessionService: UserSessionService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private navParams :NavParams
  ) {
    
     this.id = navParams.get("id");
     if(this.id){
       // this.userDetails = commonServices.findByUserId(this.id);
        console.log("find profile by id :",JSON.stringify(this.userDetails));
     }else{
      this.userDetails=userSessionService.findUserDetails()
     }
   // console.log("View Profile :",JSON.stringify(this.userDetails));
  }

  
  ionViewDidEnter() {
    //this.getContact(this.user.id);
  }

  getContact(id) {
    /*
    if (this.contact) {
      this.loading = this.loadingCtrl.create({
        content: 'Logging In...'
      }); this.loading.present();
    }
    this.contactApi.findById(id, {
      where: { and: [{ is_active: true }, { is_deleted: false }] }, include: ['friends', 'calendarEvents']
    }).subscribe(
      (contact: Contact) => {
        this.loading ? this.loading.dismissAll() : null; //if subsequent page load loading variable will be undefined
        this.contact = contact;
      },
      error => {
        this.loading ? this.loading.dismissAll() : null;
        this.commonServices.showAlert('Error', error.message);
      })
      */
  }

  editUser() {
    /*let modal = this.modalCtrl.create(ProfileEditComponent, { contact: this.contact });
    modal.onDidDismiss((contact: Contact) => {
      this.user = contact;
    });
    modal.present();
    */
  }

  addFeed() {
   /* let modal = this.modalCtrl.create(NewsAddModal, { feed: false });
    modal.present();
    */
  }

  addFriend() {
    //this.navCtrl.push(PeopleComponent);
  }

  addEvent() {
    /*
    let modal = this.modalCtrl.create(DashboardCalendarModal, { calendar_event: { start: new Date() } });
    modal.present();

    */
  }

}
