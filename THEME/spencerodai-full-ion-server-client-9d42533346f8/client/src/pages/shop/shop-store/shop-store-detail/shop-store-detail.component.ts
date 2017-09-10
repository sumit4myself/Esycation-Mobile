import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { CommonServices } from '../../../../shared/services/common.service';
import { Contact, Product, Like, LikeApi } from '../../../../shared/sdk';
import { StoreProductsComponent } from '../shop-store-products/shop-store-products.component';
import { StoreBasketComponent } from '../shop-store-basket/shop-store-basket.component';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'shop-store-detail',
  templateUrl: 'shop-store-detail.html'
})
export class StoreDetailComponent {

  user:Contact
  product: Product
  cart: Product[];
  alreadyLiked: Like;
  @ViewChild('mySlider') slider: Slides;
  mySlideOptions = {
    initialSlide: 0,
    loop: false,
    pager: false
  };

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private socialSharing: SocialSharing,
    private commonServices: CommonServices,
    private likeApi: LikeApi
  ) {
    this.user = commonServices.currentUser;
    this.product = navParams.data.product;
    this.cart = navParams.data.cart;
    this.alreadyLiked = this.product.likes.filter(item => {
      return item.contactId === this.user.id
    })[0];
  }

  onUpdateRate(ev) {
    this.product.rating = ev;
  }

   goToCart() {
    this.navCtrl.push(StoreBasketComponent, this.cart);
  }

  addToCart(item) {
    this.cart.push(item);
  }

  navigateBack() {
    this.navCtrl.popTo(StoreProductsComponent, { product: this.product, cart: this.cart });
  }

  like() {
    if (!this.alreadyLiked) {
      let like = {
        created_at: new Date(),
        created_by: this.user.id,
        productId: this.product.id,
        updated_at: new Date(),
        updated_by: this.user.id,
        contactId: this.user.id
      }
      this.likeApi.create(<any>like).subscribe((result) =>
        this.product.likes.push(result));
    } else {
      this.likeApi.deleteById(this.alreadyLiked.id).subscribe(result => {
        this.product.likes.splice(this.product.likes.indexOf(this.alreadyLiked), 1);
      });
    }
    this.alreadyLiked = undefined;
  }

  share() {
    this.socialSharing.share(this.product.name, this.product.description, null, this.product.department).then(() => {
    }).catch((error) => {
      this.commonServices.showAlert("Error", error.message)
    });
  }

  ionViewDidLoad() {

  }

}
