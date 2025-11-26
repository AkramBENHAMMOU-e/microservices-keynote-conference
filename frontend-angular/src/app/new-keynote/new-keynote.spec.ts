import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKeynote } from './new-keynote';

describe('NewKeynote', () => {
  let component: NewKeynote;
  let fixture: ComponentFixture<NewKeynote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewKeynote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewKeynote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
