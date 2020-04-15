import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonViewComponent } from './pokemon-view.component';

describe('PokemonViewComponent', () => {
  let component: PokemonViewComponent;
  let fixture: ComponentFixture<PokemonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
