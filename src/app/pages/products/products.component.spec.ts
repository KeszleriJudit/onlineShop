import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { of } from 'rxjs';
import { Product } from 'src/app/models/products.model';

import { ProductsComponent } from './products.component';
import { MatIconModule } from '@angular/material/icon';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: ProductsService;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      imports: [MatIconModule],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getProducts: () => of([
              { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 10, minOrderAmount: 1, price: 10, orderedQuantity: 0 },
              { id: '2', name: 'Product 2', img: 'image2.jpg', availableAmount: 5, minOrderAmount: 2, price: 20, orderedQuantity: 0 },
              { id: '3', name: 'Product 3', img: 'image3.jpg', availableAmount: 3, minOrderAmount: 3, price: 30, orderedQuantity: 0 },
            ]),
          },
        },
        {
          provide: CartService,
          useValue: {
            setCart: jasmine.createSpy('setCart'),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService);
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on initialization', () => {
    spyOn(productsService, 'getProducts').and.callThrough();
    component.ngOnInit();
    expect(productsService.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(3);
  });

  it('should add product to cart when addToCart is called', () => {
    const product: Product = { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 10, minOrderAmount: 1, price: 10, orderedQuantity: 0 };
    component.currentCart = [];
    component.addToCart(product);
    expect(component.currentCart.length).toBe(1);
    expect(component.currentCart[0]).toEqual(product);
    expect(cartService.setCart).toHaveBeenCalledWith(component.currentCart);
  });

  it('should increment ordered quantity when addToCart is called with an existing product', () => {
    const product: Product = { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 10, minOrderAmount: 1, price: 10, orderedQuantity: 1 };
    component.currentCart = [product];
    component.addToCart(product);
    expect(component.currentCart[0].orderedQuantity).toBe(2);
    expect(cartService.setCart).toHaveBeenCalledWith(component.currentCart);
  });

  it('should not exceed available amount when addToCart is called', () => {
    const product: Product = { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 2, minOrderAmount: 1, price: 10, orderedQuantity: 2 };
    component.currentCart = [product];
    component.addToCart(product);
    expect(component.currentCart[0].orderedQuantity).toBe(2);
    expect(cartService.setCart).toHaveBeenCalledWith(component.currentCart);
  });

  it('should remove product from cart when removeFromCart is called', () => {
    const product: Product = { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 10, minOrderAmount: 1, price: 10, orderedQuantity: 0 };
    component.currentCart = [product];
    component.removeFromCart(product);
    expect(component.currentCart.length).toBe(0);
    expect(cartService.setCart).toHaveBeenCalledWith(component.currentCart);
  });

  it('should decrement ordered quantity when removeFromCart is called with an existing product', () => {
    const product: Product = { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 10, minOrderAmount: 1, price: 10, orderedQuantity: 2 };
    component.currentCart = [product];
    component.removeFromCart(product);
    expect(component.currentCart[0].orderedQuantity).toBe(1);
    expect(cartService.setCart).toHaveBeenCalledWith(component.currentCart);
  });

  it('should remove product from cart when ordered quantity is equal to min order amount', () => {
    const product: Product = { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 10, minOrderAmount: 10, price: 10, orderedQuantity: 10 };
    component.currentCart = [product];
    component.removeFromCart(product);
    expect(component.currentCart.length).toBe(0);
    expect(cartService.setCart).toHaveBeenCalledWith(component.currentCart);
  });

  it('should return -1 when checkInCart is called with a product not in the cart', () => {
    const product: Product = { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 10, minOrderAmount: 1, price: 10, orderedQuantity: 0 };
    component.currentCart = [];
    const index = component.checkInCart(product);
    expect(index).toBe(-1);
  });

  it('should return the index when checkInCart is called with an existing product', () => {
    const product: Product = { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 10, minOrderAmount: 1, price: 10, orderedQuantity: 0 };
    component.currentCart = [product];
    const index = component.checkInCart(product);
    expect(index).toBe(0);
  });

  it('should return the item from cart when getItemFromCart is called with an existing product', () => {
    const product: Product = { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 10, minOrderAmount: 1, price: 10, orderedQuantity: 0 };
    component.currentCart = [product];
    const item = component.getItemFromCart(product);
    expect(item).toBe(product);
  });

});
