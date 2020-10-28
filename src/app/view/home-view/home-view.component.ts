import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/cmp/modal/modal.component';
import { ApiService } from 'src/app/http/api.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  private data: Array<any> = null;
  private orderById: boolean = true;
  private orderByName: boolean = true;

  public dataSelected: Array<any> = null;

  public id: number = null;
  public name: string = null;
  public img: string = null;
  public qtd: any = null;
  public pages: number = null;
  public arrayPages: Array<any> = null;
  public currentPage: number = 1;

  constructor(
    private api: ApiService,
    public modal: ModalService,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.LoadData();
  }

  LoadData(page: number = null, startPage: number = 1) {
    this.qtd = document.getElementById('qtd');
    this.api.ApiConn(page, this.qtd.value).subscribe(
      res => {
        this.data = [];
        res.results.forEach(element => {
          let _id = element.url.replace(/https\:\/\/pokeapi\.co\/api\/v2\/pokemon\//gi, "").replace(/\//gi, "");
          this.data.push({
            id: _id,
            name: element.name,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${_id}.png`,
          });
        });

        this.dataSelected = this.data;
        this.Paginate(startPage);
      },
      err => {
        this.data = null;
      }
    );
  }

  PageQtt() {
    this.ngAfterViewInit();
  }

  Paginate(start) {
    this.arrayPages = [];
    this.pages = 1050 / this.qtd.value;
    for (let i = start; i <= (start + 4); i++) {
      this.arrayPages.push(i);
    }
  }

  OrderById() {
    this.orderById ? this.orderById = false : this.orderById = true;
    if (this.orderById) {
      this.dataSelected.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    } else {
      this.dataSelected.sort((a, b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0));
    }
  }

  OrderByName() {
    this.orderByName ? this.orderByName = false : this.orderByName = true;
    if (this.orderByName) {
      this.dataSelected.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    } else {
      this.dataSelected.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
    }
  }

  SearchPokemon(pk: string) {
    this.dataSelected = [];
    this.data.forEach(element => {
      if (element.name.includes(pk)) {
        this.dataSelected.push(element);
      } else if (element.id == pk) {
        this.dataSelected.push(element);
      }
    });
  }

  GoToPage(num) {
    this.currentPage == num;

    if (num == -1) {
      if (this.currentPage < 1) {
        this.currentPage = 1;
      }
    } else if (num == 1) {
      if (this.currentPage > 1049) {
        this.currentPage = 1045;
      }
    } else {
      this.LoadData(num, num);
    }
  }

}
