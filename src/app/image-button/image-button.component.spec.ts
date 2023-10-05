import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageButtonComponent } from './image-button.component';

describe('ImageButtonComponent', () => {
  let component: ImageButtonComponent;
  let fixture: ComponentFixture<ImageButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageButtonComponent]
    });
    fixture = TestBed.createComponent(ImageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
