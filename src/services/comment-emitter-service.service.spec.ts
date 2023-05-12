import { TestBed } from '@angular/core/testing';

import { CommentEmitterServiceService } from './comment-emitter-service.service';

describe('CommentEmitterServiceService', () => {
  let service: CommentEmitterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentEmitterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
