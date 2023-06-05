import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [RouterTestingModule, MatTabsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two tab links', () => {
    const tabLinkElements = fixture.debugElement.queryAll(By.css('a.mat-tab-link'));
    expect(tabLinkElements.length).toBe(2);
  });

  it('should have correct routerLinks on tab links', () => {
    const tabLinkElements = fixture.debugElement.queryAll(By.css('a.mat-tab-link'));
    const homeTabLink = tabLinkElements[0].nativeElement;
    const productsTabLink = tabLinkElements[1].nativeElement;

    expect(homeTabLink.getAttribute('routerLink')).toBe('home');
    expect(productsTabLink.getAttribute('routerLink')).toBe('products');
  });
});