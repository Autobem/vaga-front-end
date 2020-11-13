import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css']
})
export class FormSearchComponent implements OnDestroy {

  @Output() formChange = new EventEmitter<string>();
  searchForm: FormGroup;
  subscriptions: Subscription[]

  constructor(private formBuilder: FormBuilder) { 
    this.searchForm = this.formBuilder.group({
      search: ['']
    });

    this.subscriptions = [
      this.searchForm.controls.search.valueChanges.subscribe(value => this.formChange.emit(value)) // emit signal (string) for each value typed
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
