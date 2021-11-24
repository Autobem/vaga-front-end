import { RoutingModule } from './routing.module';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    HomeComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
  ]
})
export class PaginasModule { }
