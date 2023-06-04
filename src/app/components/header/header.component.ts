import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/products.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cart: Product[] | null = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    let productList = localStorage.getItem('cart_items');
    if(productList){
      this.cart = JSON.parse(productList);
    }
  }

  getTotalValue(): number {
    let totalValue = 0;
    this.cart!.forEach(element => {
      totalValue += element.orderedQuantity * element.price;
    });
    return totalValue;
  }
  
  navigateToCart(){
    this.router.navigate(['/cart']);
  }
}
