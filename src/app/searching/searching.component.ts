import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SearchingFectherService } from './searching-fetcher.service';
import { Observable } from 'rxjs';
import { Pokemon } from '../shared/models/pokemon';
import { Results } from '../shared/models/api-list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss']
})


export class SearchingComponent implements OnInit {

  searchForm: FormGroup;

  typeList: Observable<string[]>;
  resultList: Observable<Results[]>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 650px)'])
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: SearchingFectherService) { }

  ngOnInit(): void {
    this.typeList = this.service.fethTypes();
    this.resultList = this.service.pokemonList();
    this.searchForm = this.formBuilder.group({
      poketype: [''],
      pokename: [''],
    });
  }

}



