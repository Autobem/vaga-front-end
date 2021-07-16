import { Injectable } from '@angular/core';

import {  BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal/modal.component'


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor( private bsmodalService: BsModalService
    
   ) { }

  mostModal( title: string ,message1: string, message2: string){
    const bsModalRef: BsModalRef =this.bsmodalService.show(ModalComponent);
    bsModalRef.content.title=title;
    bsModalRef.content.message1=message1;
    bsModalRef.content.message2=message2;

  }
  
}
