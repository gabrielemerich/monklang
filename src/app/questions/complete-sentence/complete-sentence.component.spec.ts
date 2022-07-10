import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteSentenceComponent } from './complete-sentence.component';

describe('CompleteSentenceComponent', () => {
  let component: CompleteSentenceComponent;
  let fixture: ComponentFixture<CompleteSentenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteSentenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteSentenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
