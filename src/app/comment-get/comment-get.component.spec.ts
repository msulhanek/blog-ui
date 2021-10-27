import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentGetComponent } from './comment-get.component';

describe('CommentGetComponent', () => {
  let component: CommentGetComponent;
  let fixture: ComponentFixture<CommentGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
