import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorhrDashboardComponent } from './seniorhr-dashboard.component';

describe('SeniorhrDashboardComponent', () => {
  let component: SeniorhrDashboardComponent;
  let fixture: ComponentFixture<SeniorhrDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeniorhrDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeniorhrDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
