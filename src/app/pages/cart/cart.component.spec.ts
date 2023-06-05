import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/products.model';
import { of } from 'rxjs';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  const mockCart: Product[] = [
    { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 10, minOrderAmount: 1, price: 10, orderedQuantity: 1 },
    { id: '2', name: 'Product 2', img: 'image2.jpg', availableAmount: 5, minOrderAmount: 2, price: 20, orderedQuantity: 2 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [MatTableModule],
      providers: [CartService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCartItems and populate cart with data', () => {
    spyOn(cartService, 'getCart').and.returnValue(mockCart);

    component.getCartItems();

    expect(cartService.getCart).toHaveBeenCalled();
    expect(component.cart).toEqual(mockCart);
  });

  it('should calculate the total value correctly', () => {
    component.cart = mockCart;

    const totalValue = component.getTotalValue();

    expect(totalValue).toBe(50);
  });

});
