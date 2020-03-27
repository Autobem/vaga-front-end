import { TestBed } from '@angular/core/testing';

import { ListPokemonsService } from './list-pokemons.service';

describe('ListPokemonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListPokemonsService = TestBed.get(ListPokemonsService);
    expect(service).toBeTruthy();
  });
});
