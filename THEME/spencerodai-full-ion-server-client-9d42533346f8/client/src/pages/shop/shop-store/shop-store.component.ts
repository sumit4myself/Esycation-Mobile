import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StoreProductsComponent } from './shop-store-products/shop-store-products.component';

@Component({
  selector: 'shop-store',
  templateUrl: 'shop-store.html'
})
export class ShopStoreComponent {

  pushStore: any;
  types: any[] = [{
    title: 'Men',
    image: 'http://www.ionicity.co.uk/wp-content/uploads/2016/12/mens_shop.png',
    key:'men',
  },
  {
    title: 'Women',
    image: 'http://www.ionicity.co.uk/wp-content/uploads/2016/12/womens_shop.jpg',
    key:'women',
  },
  {
    title: 'Kids',
    image: 'http://www.ionicity.co.uk/wp-content/uploads/2016/12/kids_shop.jpg',
    key:'kids',
  }]

  constructor(public navCtrl: NavController) {
    this.pushStore = StoreProductsComponent;
  }
}