import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header.component';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/products.model';
import { Router, RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartService: CartService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule, MatToolbarModule, MatMenuModule, MatIconModule, MatBadgeModule, BrowserAnimationsModule, RouterModule],
      providers: [CartService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the number of items in the cart', () => {
    const numberOfItems = 3;
    spyOn(cartService, 'getCart').and.returnValue([
      { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 10, minOrderAmount: 1, price: 10, orderedQuantity: 1 },
      { id: '2', name: 'Product 2', img: 'image2.jpg', availableAmount: 15, minOrderAmount: 1, price: 5, orderedQuantity: 2 }
    ] as Product[]);
    spyOn(cartService, 'getNumberOfItemsInCart').and.returnValue(numberOfItems);
    fixture.detectChanges();

    const badgeElement = fixture.debugElement.query(By.css('.mat-badge-content')).nativeElement;
    expect(badgeElement.innerText).toBe(numberOfItems.toString());
  });

  it('should navigate to cart when the button is clicked', () => {
    fixture.detectChanges();
    const menuButtonElement = fixture.debugElement.query(By.css('.cart-menu'));
    spyOn(component, 'navigateToCart');
    menuButtonElement.nativeElement.click();

    const cartButtonElement = fixture.debugElement.query(By.css('.cart-button'));
    cartButtonElement.nativeElement.click();
  
    expect(component.navigateToCart).toHaveBeenCalled();
  });

  it('should call getCartItems on initialization', () => {
    spyOn(component, 'getCartItems');
    component.ngOnInit();
    expect(component.getCartItems).toHaveBeenCalled();
  });

  it('should get the total value of the cart', () => {
    component.cart = [
      { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 20, minOrderAmount: 1, price: 10, orderedQuantity: 1 },
      { id: '2', name: 'Product 2', img: 'image2.jpg', availableAmount: 15, minOrderAmount: 1, price: 5, orderedQuantity: 2 }
    ] as Product[];
  
    const totalValue = component.getTotalValue();
  
    expect(totalValue).toBe(20);
  });
});
