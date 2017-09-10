/* tslint:disable */
import {
  Like
} from '../index';

declare var Object: any;
export interface ProductInterface {
  name?: string;
  department?: string;
  description?: string;
  price?: number;
  images?: Array<string>;
  size?: Array<string>;
  rating?: number;
  dimensions?: string;
  weight?: number;
  quantity?: number;
  sale: boolean;
  sale_price?: number;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id?: any;
  likes?: Like[];
}

export class Product implements ProductInterface {
  name: string;
  department: string;
  description: string;
  price: number;
  images: Array<string>;
  size: Array<string>;
  rating: number;
  dimensions: string;
  weight: number;
  quantity: number;
  sale: boolean;
  sale_price: number;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id: any;
  likes: Like[];
  constructor(data?: ProductInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Product`.
   */
  public static getModelName() {
    return "Product";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Product for dynamic purposes.
  **/
  public static factory(data: ProductInterface): Product{
    return new Product(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Product',
      plural: 'Products',
      properties: {
        name: {
          name: 'name',
          type: 'string'
        },
        department: {
          name: 'department',
          type: 'string'
        },
        description: {
          name: 'description',
          type: 'string'
        },
        price: {
          name: 'price',
          type: 'number'
        },
        images: {
          name: 'images',
          type: 'Array&lt;string&gt;'
        },
        size: {
          name: 'size',
          type: 'Array&lt;string&gt;'
        },
        rating: {
          name: 'rating',
          type: 'number'
        },
        dimensions: {
          name: 'dimensions',
          type: 'string'
        },
        weight: {
          name: 'weight',
          type: 'number'
        },
        quantity: {
          name: 'quantity',
          type: 'number'
        },
        sale: {
          name: 'sale',
          type: 'boolean',
          default: false
        },
        sale_price: {
          name: 'sale_price',
          type: 'number'
        },
        is_active: {
          name: 'is_active',
          type: 'boolean',
          default: true
        },
        is_deleted: {
          name: 'is_deleted',
          type: 'boolean',
          default: false
        },
        created_at: {
          name: 'created_at',
          type: 'Date'
        },
        updated_at: {
          name: 'updated_at',
          type: 'Date'
        },
        updated_by: {
          name: 'updated_by',
          type: 'string'
        },
        created_by: {
          name: 'created_by',
          type: 'string'
        },
        id: {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        likes: {
          name: 'likes',
          type: 'Like[]',
          model: 'Like'
        },
      }
    }
  }
}
