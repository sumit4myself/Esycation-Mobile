import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { Contact, Product, ProductApi } from '../../../shared/sdk';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'shop-office',
  templateUrl: 'shop-office.html'
})
export class ShopOfficeComponent {

  user: Contact
  products: Product[];
  productsBackup: Product[];
  loading: Loading;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private productApi: ProductApi,
    private commonServices: CommonServices,
    public alertCtrl: AlertController
    ) {
    this.user = commonServices.currentUser;
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

  addProduct() {
    this.navCtrl.push(AddProductComponent);
  }
  editProduct(product) {
    this.navCtrl.push(AddProductComponent, product);
  }

  deleteProduct(product) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Product',
      message: 'Do you agree to deleting this product?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.productApi.deleteById(product.id).subscribe(() => {
              this.products.splice(this.products.findIndex(item => item.id === product.id), 1);
              this.initializeItems(this.products);
            },
              (error) => { this.commonServices.showAlert('Error', error.message); })
          }
        }
      ]
    });
    confirm.present();
  }

  getProducts() {
    this.productApi.find({ where: { and: [{ department: this.navParams.data.key }, { is_deleted: false }, { is_active: true }] }, include: 'likes' }).subscribe(
      (products: Product[]) => {
        this.productsBackup = products;
        this.initializeItems(this.productsBackup)
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


