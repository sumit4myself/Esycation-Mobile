import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, LoadingController, Loading, Slides, Events } from 'ionic-angular';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewsComponent } from '../news/news.component';
import { CommonServices } from '../../shared/services/common.service';
import { ContactApi, Account, AccountApi, RealTime } from '../../shared/sdk';

@Component({
  selector: 'intro-page',
  templateUrl: 'intro.html'
})

export class IntroComponent {

  loading: Loading;
  slides: Array<{ image: string, title: string, paragraph: string, button: string }>
  walkthroughSlider: any;
  @ViewChild('walkthroughSlider') slider: Slides;

  constructor(
    private navCtrl: NavController,
    private contactApi: ContactApi,
    private userApi: AccountApi,
    private commonServices: CommonServices,
    private events: Events,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private rt: RealTime
  ) { }

  configureSlides() {
    this.walkthroughSlider = {
      initialSlide: 0,
      loop: true,
      autoplay: 5000,
      pager: true,
      speed: 500
    };
    this.slides = [{
      image: 'http://www.ionicity.co.uk/wp-content/uploads/2016/12/ionicity-logo.png',
      title: 'Ionicity',
      paragraph: 'Full Starter Template<br> (Ionic. Angular 2. Loopback. Mongo DB)',
      button: 'Skip'
    }, {
      image: 'http://www.ionicity.co.uk/wp-content/uploads/2016/12/ionic2.png',
      title: 'Ionic 2 theme',
      paragraph: ' Capicola porchetta rump fatback bacon beef ribs ribeye. Pork belly alcatra cow tongue jowl pork loin swine t-bone shank.',
      button: 'Skip'
    }, {
      image: 'http://www.ionicity.co.uk/wp-content/uploads/2016/12/intro1.png',
      title: 'The Missing Sun',
      paragraph: 'Boudin frankfurter ribeye prosciutto bacon venison, cow ham hock.',
      button: 'Skip'
    }, {
      image: 'http://www.ionicity.co.uk/wp-content/uploads/2016/12/intro.png',
      title: 'The Ancient Cottage',
      paragraph: 'Drumstick shankle cow, prosciutto t-bone frankfurter venison. Frankfurter ground round shoulder, leberkas tenderloin hamburger.',
      button: 'Skip'
    }]
  }

  ionViewDidLoad() {
    this.configureSlides();
    let accessToken = localStorage.getItem('$LoopBackSDK$id');
    let user: Account = JSON.parse(localStorage.getItem('$LoopBackSDK$user'));
    let userId = localStorage.getItem('$LoopBackSDK$userId');
    if (accessToken && user) {
      this.getAccountDetails(userId);
    }
  }

  openLogin() {
    let modal = this.modalCtrl.create(LoginComponent);
    modal.onDidDismiss((auth: Account) => {
      if (auth) {
        this.rt.onReady().subscribe(() => { })
        this.commonServices.currentUser = auth.contact;
        this.events.publish('isLoggedIn');
        this.navCtrl.setRoot(NewsComponent);
      }
    });
    modal.present();
  }

  openSignUp() {
    let modal = this.modalCtrl.create(SignupComponent);
    modal.onDidDismiss((auth: Account) => {
      if (auth) {
        /*
start realtime to listen for events.
useful links: http://docs.fireloop.io/en/api/
              https://github.com/mean-expert-official/loopback-component-realtime
*/
        this.rt.onReady().subscribe(() => { })
        this.commonServices.currentUser = auth.contact;
        this.events.publish('isLoggedIn');
        this.navCtrl.setRoot(NewsComponent);
      }
    });
    modal.present();
  }

  getAccountDetails(id) {
    this.loading = this.loadingCtrl.create({
      content: 'Logging In...'
    }); this.loading.present();
    this.userApi.findById(id,
      {
        include: {
          relation: 'contact',
          scope: {
            where: { and: [{ is_active: true }, { is_deleted: false }] },
            include: {
              relation: 'preference',
              scope: {
                where: { and: [{ is_active: true }, { is_deleted: false }] },
              }
            }
          }
        }
      }).subscribe(
      (user: Account) => {
        this.rt.onReady().subscribe(() => { })
        this.commonServices.currentUser = user.contact;
        this.loading.dismissAll();
        this.events.publish('isLoggedIn');
        this.navCtrl.setRoot(NewsComponent);
      },
      error => {
        this.loading.dismissAll();
        this.commonServices.showAlert('Login Error', error.message);
      });
  }

  goToSlide() {
    this.slider.slideNext(500);
  }

}
