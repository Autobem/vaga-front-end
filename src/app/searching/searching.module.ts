import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SearchingComponent } from './searching.component';
import { DemoMaterialModule } from '../material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { PokemonViewComponent } from './pokemon-view/pokemon-view.component';


@NgModule({
  declarations: [SearchingComponent, PokemonViewComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // DemoMaterialModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,

  ],
  exports: [SearchingComponent]
})
export class SearchingModule { }
