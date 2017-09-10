import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController  } from 'ionic-angular';
import { CommonServices } from '../../../../shared/services/common.service';
import { Contact, ProductApi } from '../../../../shared/sdk';
import { ShopStoreComponent } from '../shop-store.component'
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'shop-store-checkout',
  templateUrl: 'shop-store-checkout.html'
})
export class StoreCheckoutComponent {

  user:Contact
  grandTotal: number = 0;
  payment_type: any[] = ["Card", "Paypal", "Cheque"];
  card_type: any[] = ["Visa", "Visa Debit", "Visa Electron", "Master Card", "American Express"];
  payment: any;
  loading: Loading;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private inAppBrowser: InAppBrowser,
    private loadingCtrl: LoadingController,
    private commonServices: CommonServices,
    private productApi: ProductApi) {
    this.user = commonServices.currentUser;
    this.grandTotal = navParams.data;
    this.payment = {
      type: null,
      card: {
        type: null,
        number: '',
        expiry: '',
        csv: '',
        billing_address: {
          name: '',
          street: '',
          city: '',
          country: '',
          post_code: ''
        },
        is_same_address: true,
        delivery_address: {
          name: '',
          street: '',
          city: '',
          country: '',
          post_code: ''
        }
      },
    };
  }

  confirmPay() {
     this.loading = this.loadingCtrl.create({
        content: 'Processing Payment...',
        duration: 4000
      }); this.loading.present();
    this.commonServices.showAlert('Payment Sucessful', 'Your Purchase has been successfuly order and will be dispacthed Shortly', 'CONFIRM');
    this.navCtrl.setRoot(ShopStoreComponent);
  }

  payPal() {
    this.inAppBrowser.create('https://paypal.co.uk');

  }

}
