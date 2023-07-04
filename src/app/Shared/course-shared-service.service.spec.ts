import { TestBed } from '@angular/core/testing';

import { CourseSharedServiceService } from './course-shared-service.service';

describe('CourseSharedServiceService', () => {
  let service: CourseSharedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseSharedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
