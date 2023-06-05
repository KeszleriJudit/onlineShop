import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [MatSidenavModule, BrowserAnimationsModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.title).toBeDefined();
    expect(typeof component.title).toBe('string');
  });

  it('should render the header component', () => {
    const headerComponent = fixture.nativeElement.querySelector('app-header');
    expect(headerComponent).toBeTruthy();
  });

  it('should render the nav component', () => {
    const navComponent = fixture.nativeElement.querySelector('app-nav');
    expect(navComponent).toBeTruthy();
  });

  it('should render the mat-drawer-container', () => {
    const drawerContainer = fixture.nativeElement.querySelector('mat-drawer-container');
    expect(drawerContainer).toBeTruthy();
  });

  it('should render the mat-drawer-content', () => {
    const drawerContent = fixture.nativeElement.querySelector('mat-drawer-content');
    expect(drawerContent).toBeTruthy();
  });

  it('should render the router-outlet', () => {
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });
});
