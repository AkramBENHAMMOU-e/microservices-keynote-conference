import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeynotesConferenceModale } from './keynotes-conference-modale';

describe('KeynotesConferenceModale', () => {
  let component: KeynotesConferenceModale;
  let fixture: ComponentFixture<KeynotesConferenceModale>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeynotesConferenceModale]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeynotesConferenceModale);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
