import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/http/api.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  private id: number = 1;
  private data = null;
  private orderById: boolean = true;
  private orderByName: boolean = true;

  public dataSelected = null;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.ApiConn().subscribe(
      res => {
        this.data = [];
        res.results.forEach(element => {
          this.data.push({
            id: this.id,
            name: element.name,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`,
          });
          this.id++;
        });

        this.dataSelected = this.data;
      },
      err => {
        this.data = JSON.stringify("Erro na busca: " + err);
      }
    );
  }

  OrderById() {
    let _data = null;
    _data = this.data;

    this.dataSelected = null;
    this.dataSelected = _data.reverse();
  }

  OrderByName() {
    let _name = this.dataSelected;
    this.dataSelected = [];

    _name.sort(function (a, b) {
      console.log(a.name, b.name);
      console.log(a.name < b.name);
      if (a.name < b.name) {
        this.dataSelected.push(
          {
            id: a.id,
            name: a.name,
            img: a.img
          },
          {
            id: b.id,
            name: b.name,
            img: b.img
          },
        );
      } else {
        this.dataSelected.push(
          {
            id: b.id,
            name: b.name,
            img: b.img
          },
          {
            id: a.id,
            name: a.name,
            img: a.img
          }
        );
      }
    });
  }

}
