import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from '../models/products.model';
import { Observable } from 'rxjs';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Product[]>', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', img: 'image1.jpg', availableAmount: 10, minOrderAmount: 1, price: 10, orderedQuantity: 0 },
      { id: '2', name: 'Product 2', img: 'image2.jpg', availableAmount: 20, minOrderAmount: 1, price: 20, orderedQuantity: 0 },
      { id: '3', name: 'Product 3', img: 'image3.jpg', availableAmount: 30, minOrderAmount: 1, price: 30, orderedQuantity: 0 }
    ];

    service.getProducts().subscribe((products: Product[]) => {
      expect(products.length).toBe(3);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(service.mockUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should handle an error properly', () => {
    const mockError = { status: 404, statusText: 'Not Found' };

    service.getProducts().subscribe(
      (products: Product[]) => {
        expect(true).toBe(false);
      },
      (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    );

    const req = httpMock.expectOne(service.mockUrl);
    expect(req.request.method).toBe('GET');
    req.flush(null, mockError);
  });
});