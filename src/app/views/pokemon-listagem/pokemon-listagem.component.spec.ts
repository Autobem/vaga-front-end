import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListagemComponent } from './pokemon-listagem.component';

describe('PokemonListagemComponent', () => {
  let component: PokemonListagemComponent;
  let fixture: ComponentFixture<PokemonListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
