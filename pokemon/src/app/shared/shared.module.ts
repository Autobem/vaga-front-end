import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ListaComponent } from './lista/lista.component';
import { BuscaComponent } from './busca/busca.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ListaComponent,
    BuscaComponent,
    FooterComponent,
  ],
  exports: [HeaderComponent, BuscaComponent, ListaComponent,FooterComponent,NgbModule],
  imports: [CommonModule, RouterModule,NgbModule]
})
export class SharedModule { }
