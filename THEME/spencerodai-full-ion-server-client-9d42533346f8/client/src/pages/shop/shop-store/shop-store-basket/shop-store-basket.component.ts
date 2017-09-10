import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonServices } from '../../../../shared/services/common.service';
import { Contact, Product, ProductApi } from '../../../../shared/sdk';
import { StoreCheckoutComponent } from '../shop-store-checkout/shop-store-checkout.component';

@Component({
  selector: 'shop-store-basket',
  templateUrl: 'shop-store-basket.html'
})
export class StoreBasketComponent {

  user:Contact
  cartProducts: Product[];
  grandTotal: number = 0;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private commonServices: CommonServices,
    private productApi: ProductApi
    ) {
    this.user = commonServices.currentUser;
    this.cartProducts = navParams.data;

    this.cartProducts.forEach(product => {
      if (product.sale) {
        this.grandTotal = this.grandTotal + product.sale_price;
      } else {
        this.grandTotal = this.grandTotal + product.price;
      }
    });
  }

  removeItem(index) {
    this.cartProducts.splice(index, 1);
  }

  goToCheckout(total) {
    this.navCtrl.push(StoreCheckoutComponent, total);
  }
  ionViewDidLoad() {

  }

}
