import { TestBed } from '@angular/core/testing';

// We changed { Database } to { DatabaseService } here:
import { DatabaseService } from './database.service'; 

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});