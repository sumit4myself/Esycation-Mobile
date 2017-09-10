import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Loading, LoadingController } from 'ionic-angular';
import { CommonServices } from '../../../../shared/services/common.service';
import { Contact, Product, ProductApi, Like, LikeApi } from '../../../../shared/sdk';
import { StoreDetailComponent } from '../shop-store-detail/shop-store-detail.component';
import { StoreBasketComponent } from '../shop-store-basket/shop-store-basket.component';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'shop-store-products',
  templateUrl: 'shop-store-products.html'
})
export class StoreProductsComponent {

  user:Contact
  products: Product[];
  productsBackup: Product[];
  rows: number[];
  productsView: string = 'list';
  cart: Product[] = [];
  productDetailPage: any;
  alreadyLiked: Like;
  loading: Loading;
  prefs: any = { sortBy: 'created_at', sort: 'DESC' };
  @ViewChild('mySlider') slider: Slides;
  mySlideOptions = {
    initialSlide: 0,
    loop: false,
    pager: true
  };

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private commonServices: CommonServices,
    private socialSharing: SocialSharing,
    private productApi: ProductApi,
    private likeApi: LikeApi
    ) {
    this.user = commonServices.currentUser;
    this.prefs = {
      sortBy: this.user.preference.sortProductBy,
      sort: this.user.preference.sortProductOrder
    };
    this.productsView = this.user.preference.productsView;
    this.productDetailPage = StoreDetailComponent;


  }

  ionViewDidEnter() {
    if (!this.products) {
      this.loading = this.loadingCtrl.create({
        content: 'Retrieving Products...'
      }); this.loading.present();
    }
    this.getProducts();
  }

  initializeItems(value) {
    this.products = [...value];
  }

  getProducts() {
    this.productApi.find({ where: { and: [{ department: this.navParams.data.key }, { is_deleted: false }, { is_active: true }] }, include: 'likes', order: this.prefs.sortBy + ' ' + this.prefs.sort }).subscribe(
      (products: Product[]) => {
        this.productsBackup = products;
        this.initializeItems(this.productsBackup)
        this.rows = Array.from(Array(Math.ceil(this.productsBackup.length / 2)).keys());
        this.products.forEach((product: any) => {
          let alreadyLiked = product.likes.filter(item => item.contactId === this.user.id)[0];
          if (alreadyLiked) {
            product.alreadyLiked = alreadyLiked;
          }
        });
        this.loading ? this.loading.dismissAll() : null;
      },
      error => {
        this.loading ? this.loading.dismissAll() : null;
        this.commonServices.showAlert('Error', error);
      })
  }

  share(product) {
    this.socialSharing.share(product.name, product.description, null, product.department).then(() => {
    }).catch((error) => {
      this.commonServices.showAlert("Error", error.message)
    });
  }

  like(product) {
    product.alreadyLiked = product.likes.filter(item => item.contactId === this.user.id)[0];
    if (!product.alreadyLiked) {
      let like = {
        created_at: new Date(),
        created_by: this.user.id,
        productId: product.id,
        updated_at: new Date(),
        updated_by: this.user.id,
        contactId: this.user.id
      }
      this.likeApi.create(like).subscribe((result: any) => {
        product.likes.push(result);
        product.alreadyLiked = product.likes.filter(item => item.contactId === this.user.id)[0];
      });
    } else {
      this.likeApi.deleteById(product.alreadyLiked.id).subscribe(result => {
        product.likes.splice(product.likes.indexOf(product.alreadyLiked), 1);
        product.alreadyLiked = undefined;
      });
    }
    this.alreadyLiked = undefined;
  }

  goToCart() {
    this.navCtrl.push(StoreBasketComponent, this.cart);
  }

  addToCart(item) {
    this.cart.push(item);
  }

  onUpdateRate() { }

  searchItems(ev: any) {
    this.initializeItems(this.productsBackup)
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.products = this.products.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1
          || item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

}
