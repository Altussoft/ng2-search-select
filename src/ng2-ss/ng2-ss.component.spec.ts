import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2SsComponent } from './ng2-ss.component';

describe('Ng2SsComponent', () => {
  let component: Ng2SsComponent;
  let fixture: ComponentFixture<Ng2SsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2SsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2SsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
