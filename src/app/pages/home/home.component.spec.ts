import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the welcome message', () => {
    const headingElement = fixture.nativeElement.querySelector('h2');
    const paragraphElement = fixture.nativeElement.querySelector('p');

    expect(headingElement.textContent).toContain('Welcome at the Online Shop!');
    expect(paragraphElement.textContent).toContain('You can find our products at the Products page.');
    expect(paragraphElement.textContent).toContain('After selecting the products, check your cart and finalize your selection.');
  });
});
