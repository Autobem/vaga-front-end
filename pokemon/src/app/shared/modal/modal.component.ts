import { Component, OnInit, Input } from '@angular/core';

import { ViewChild } from '@angular/core';
import { ModalDirective , BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { PokemonService } from '../../services/pokemon.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title:string;
  @Input() message1:string;
  @Input() message2:string;


  constructor(private modalService: BsModalService, 
    public bsModalRef: BsModalRef,  private pokemonService: PokemonService
    ) { }

  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  isModalShown = false;
 
  showModal(): void {
    this.isModalShown = true;
  }
 
  hideModal(): void {
    this.autoShownModal.hide();
  }
 
  onHidden(): void {
    this.isModalShown = false;
  }

  ngOnInit(): void {
  }
  
}
