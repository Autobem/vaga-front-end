import { Component, EventEmitter ,OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {

   @Output()
   public emmitEventPesquisa: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public pesquisar(valorDigitado: string) {
    this.emmitEventPesquisa.emit(valorDigitado);
  }
}
