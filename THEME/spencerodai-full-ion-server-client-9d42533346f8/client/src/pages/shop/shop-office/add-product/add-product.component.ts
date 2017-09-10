import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonServices } from '../../../../shared/services/common.service';
import { Contact, Product, ProductApi } from '../../../../shared/sdk';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'add-product',
  templateUrl: 'add-product.html'
})
export class AddProductComponent {

  user:Contact
  product: Product;
  addProductForm: FormGroup;
  departments: string[] = ['men', 'women', 'kids'];
  options: any = {
    maximumImagesCount: 5
  };

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private imagePicker: ImagePicker,
    private productApi: ProductApi,
    private commonServices: CommonServices
    ) {
    this.user = commonServices.currentUser;
    this.product = navParams.data;
    if (!this.product.id) {
      this.product = <any>{
        id: null,
        name: '',
        department: '',
        description: '',
        images: ['http://www.ionicity.co.uk/wp-content/uploads/2016/12/placeholder.png'],
        price: 0,
        quantity: 0,
        rating: 0,
        sale: false,
        sale_price: 0,
        size: [''],
        weight: 0,
        dimensions: '',
        likes: [],
        is_active: true,
        is_deleted: false,
        created_at: new Date(),
        created_by: this.user.id,
        updated_at: new Date(),
        updated_by: this.user.id
      }
    }
  }

  ionViewDidLoad() {
  }

  saveProduct(product) {
    if (typeof  product.size === 'string') {
      product.size = product.size.split(',');
    }
    this.productApi.upsert(product).subscribe((product: Product) => {
      this.product = product;
      this.navCtrl.pop();
      this.commonServices.presentToast('Product (' + product.name + ') has been saved');
    }, (error) => { this.commonServices.showAlert('Error', error.message); })
  }

  getPictures() {
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.product.images.push(results[i]);
      }
    }, (error) => { this.commonServices.showAlert('Error', error.message); });
  }

}
