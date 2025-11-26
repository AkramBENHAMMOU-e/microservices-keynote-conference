import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeynoteList } from './keynote-list';

describe('KeynoteList', () => {
  let component: KeynoteList;
  let fixture: ComponentFixture<KeynoteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeynoteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeynoteList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
