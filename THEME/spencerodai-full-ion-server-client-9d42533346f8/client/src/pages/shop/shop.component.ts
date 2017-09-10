import { Component } from '@angular/core';
import { ShopStoreComponent } from './shop-store/shop-store.component';
import { ShopOfficeComponent } from './shop-office/shop-office.component';

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html'
})
export class ShopComponent {

   tab1Root: any;
   tab2Root: any;

  constructor() {

    this.tab1Root = ShopStoreComponent;
    this.tab2Root = ShopOfficeComponent;
  }

}
