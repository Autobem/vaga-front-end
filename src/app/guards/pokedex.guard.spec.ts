import { TestBed } from '@angular/core/testing';

import { PokedexGuard } from './pokedex.guard';

describe('PokedexGuard', () => {
  let guard: PokedexGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PokedexGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
