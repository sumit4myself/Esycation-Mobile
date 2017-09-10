import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { ShopComponent } from './shop.component';
import { ShopStoreComponent } from './shop-store/shop-store.component';
import { ShopOfficeComponent } from './shop-office/shop-office.component';
import { StoreProductsComponent } from './shop-store/shop-store-products/shop-store-products.component';
import { StoreDetailComponent } from './shop-store/shop-store-detail/shop-store-detail.component';
import { StoreBasketComponent } from './shop-store/shop-store-basket/shop-store-basket.component';
import { StoreCheckoutComponent } from './shop-store/shop-store-checkout/shop-store-checkout.component';
import { CustomPipesModule } from '../../shared/pipes/custom-pipes.module';
import { AddProductComponent } from './shop-office/add-product/add-product.component';
import { StarRating } from '../../shared/widgets/star-rating.component';

@NgModule({
    imports: [
        IonicModule,
        MomentModule,
        ReactiveFormsModule,
        CustomPipesModule
    ],
    entryComponents: [
        ShopComponent,
        ShopStoreComponent,
        ShopOfficeComponent,
        StoreProductsComponent,
        StoreDetailComponent,
        StoreBasketComponent,
        StoreCheckoutComponent,
        AddProductComponent
    ],
    declarations: [
        ShopComponent,
        ShopStoreComponent,
        ShopOfficeComponent,
        StoreProductsComponent,
        StoreDetailComponent,
        StoreBasketComponent,
        StoreCheckoutComponent,
        AddProductComponent,
        StarRating
    ],
    providers: [],
})
export class ShopModule { }
