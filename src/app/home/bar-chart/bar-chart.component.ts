import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input() listLabel: string[];
  @Input() listData: number[];

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: string[] = ['1', '2', '3', '4', '5', '6'];
  barChartType = 'horizontalBar';
  barChartLegend = false;
  barChartData: any[] = [
    {data: [1 , 2 , 3 , 4 , 5 , 6 ]}
  ];

  constructor() { }

  ngOnInit() {
  }

}
