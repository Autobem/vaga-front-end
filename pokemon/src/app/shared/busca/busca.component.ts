import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss'],
})
export class BuscaComponent implements OnInit {

  @Output()
  public emmitSearch: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public pesquisar(valorDigitado: string) {
    this.emmitSearch.emit(valorDigitado);
  }
}
