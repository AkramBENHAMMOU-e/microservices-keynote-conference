import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConference } from './new-conference';

describe('NewConference', () => {
  let component: NewConference;
  let fixture: ComponentFixture<NewConference>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewConference]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewConference);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
