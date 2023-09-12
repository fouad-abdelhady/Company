import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesBarComponent } from './pages-bar.component';

describe('PagesBarComponent', () => {
  let component: PagesBarComponent;
  let fixture: ComponentFixture<PagesBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesBarComponent]
    });
    fixture = TestBed.createComponent(PagesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
