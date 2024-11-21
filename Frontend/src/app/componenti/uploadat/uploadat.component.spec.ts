import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadatComponent } from './uploadat.component';

describe('UploadatComponent', () => {
  let component: UploadatComponent;
  let fixture: ComponentFixture<UploadatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
