import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConference } from './new-conference';

describe('NewConference', () => {
  let component: NewConference;
  let fixture: ComponentFixture<NewConference>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewConference]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewConference);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
