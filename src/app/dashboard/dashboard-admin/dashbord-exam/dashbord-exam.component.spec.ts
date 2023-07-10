import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordExamComponent } from './dashbord-exam.component';

describe('DashbordExamComponent', () => {
  let component: DashbordExamComponent;
  let fixture: ComponentFixture<DashbordExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
