import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  currentCart: Product[] = [];

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
    let productList = localStorage.getItem('cart_items');
    if(productList){
      this.currentCart = JSON.parse(productList);
    }
  }

  addToCart(product: Product) {
    let itemIndex = this.checkInCart(product);
    if (itemIndex != -1) {
      let quantity = this.currentCart[itemIndex].orderedQuantity;
      if(quantity >= this.currentCart[itemIndex].availableAmount){
        this.currentCart[itemIndex].orderedQuantity =  this.currentCart[itemIndex].availableAmount;
      } else {
        quantity += 1;
        this.currentCart[itemIndex].orderedQuantity = quantity;
      }
    } else {
      product.orderedQuantity = product.minOrderAmount;
      this.currentCart.push(product);
    }
    localStorage.setItem('cart_items', JSON.stringify(this.currentCart));
    this.cartService.setCart(this.currentCart);
  }

  removeFromCart(product: Product){
    let itemIndex = this.checkInCart(product);
    let item = this.currentCart[itemIndex]
    let quantity = item.orderedQuantity;
    if(quantity && quantity > item.minOrderAmount){
      quantity -= 1;
      this.currentCart[itemIndex].orderedQuantity = quantity;
    } else {
      this.currentCart.splice(itemIndex, 1);
    }
    
    localStorage.setItem('cart_items', JSON.stringify(this.currentCart));
    this.cartService.setCart(this.currentCart);
  }

  checkInCart(product: Product): number {
    return this.currentCart.findIndex(element => element.id === product.id);
  }

  getItemFromCart(product: Product): Product{
    let itemIndex = this.currentCart.findIndex(element => element.id === product.id);
    return this.currentCart[itemIndex];
  }

  
  
}
