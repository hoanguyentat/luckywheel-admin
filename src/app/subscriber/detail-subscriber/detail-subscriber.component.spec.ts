import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSubscriberComponent } from './detail-subscriber.component';

describe('DetailSubscriberComponent', () => {
  let component: DetailSubscriberComponent;
  let fixture: ComponentFixture<DetailSubscriberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSubscriberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
