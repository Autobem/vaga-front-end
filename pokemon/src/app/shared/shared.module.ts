import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ListaComponent } from './lista/lista.component';
import { BuscaComponent } from './busca/busca.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ListaComponent,
    BuscaComponent
  ],
  exports: [HeaderComponent, BuscaComponent, ListaComponent,NgbModule],
  imports: [CommonModule, RouterModule]
})
export class SharedModule { }
