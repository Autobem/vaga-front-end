import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { forkJoin } from "rxjs";

@Component({
  selector: "my-app",
  template: `
    <h1 class="display-4 ">Lista de Pokemons</h1>
    <br />
    <p class="list-group" *ngIf="!completed">Carregando...</p>
    <table class="table w-50 table-hover" *ngIf="completed">
      <thead>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let pokemon of pokemonsList">
          <th scope="row">
            <img
              [src]="pokemon.info?.sprites?.front_default"
              class="img-thumbnail"
            />
          </th>
          <td>{{ pokemon.name }}</td>
          <td><button type="button" class="btn btn-info">Detalhes</button></td>
        </tr>
        <td><button type="button" class="btn btn-info">Anterior</button></td>
        <td></td>
        <td><button type="button" class="btn btn-info">Próxima</button></td>
      </tbody>
    </table>
  `,
  styles: ["img{max-height: 60px}"]
})
export class AppComponent implements OnInit {
  pokemonsList: any[] = [];
  completed: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.listAllPokemons();
  }

  listAllPokemons(): void {
    this.http
      .get("https://pokeapi.co/api/v2/pokemon/")
      .pipe(tap(console.log))
      .subscribe(data => this.loadPokemonInfo(data.results));
  }

  loadPokemonInfo(pokemonsList: any[]): void {
    const pokemonInfoObservableArray = pokemonsList.map(pokemon =>
      this.http.get(pokemon.url).pipe(
        tap(console.log),
        map(info => (pokemon.info = info)) // inclui propriedade em cada  objeto "pokemon" original do array
      )
    );
    forkJoin(...pokemonInfoObservableArray).subscribe(() => {
      this.pokemonsList = pokemonsList; // povoa o campo monitorado pelo template;
      this.completed = true; // libera a exibição;
    });
  }
}
