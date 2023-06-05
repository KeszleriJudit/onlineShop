import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  cart: Product[] = [];
  numberOfItems: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cart = this.cartService.getCart();
  }

  getTotalValue(): number {
    let totalValue = 0;
    if(this.cart){
      this.cart.forEach(element => {
      totalValue += element.orderedQuantity * element.price;
    });
    }
    return totalValue;
  }

  navigateToCart(){
    this.router.navigate(['/cart']);
  }

  getNumberOfItems(): number{
    this.numberOfItems = this.cartService.getNumberOfItemsInCart();
    return this.numberOfItems;
  }
}
