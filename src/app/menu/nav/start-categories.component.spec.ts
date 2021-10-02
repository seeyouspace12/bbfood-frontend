import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCategoriesComponent } from './start-categories.component';

describe('StartCategoriesComponent', () => {
  let component: StartCategoriesComponent;
  let fixture: ComponentFixture<StartCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
