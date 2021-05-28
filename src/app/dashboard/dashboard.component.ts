import * as math from 'mathjs';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from "ng-apexcharts";
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from './../service/api.service';
import { LignesProjetDto } from './../models/projet.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Projet } from '../models/projet.model';
import { StatisticsService } from './../service/statistics.service';
import { transfoSecEnJHMS } from '../utils/util';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  listProjets: Projet[];
  listLignes: LignesProjetDto[] = [];
  topProjets: Projet[];
  topLignes: LignesProjetDto[];
  
  form = new FormGroup({
    fromDate: new FormControl(null, { validators: [Validators.required]}),
    toDate: new FormControl(null, { validators: [Validators.required]})
  });

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['libelle', 'date_debut', 'date_fin', 'projet'];
  dataSource = new MatTableDataSource<LignesProjetDto>();

  constructor(private api: ApiService, private api_stat: StatisticsService) { 
    this._getStatistics();
  }
  
  ngOnInit(): void {
    this._getProjets();
    this._getLignes();
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private _getProjets(){
    this.api.getAllProjetFromServer().subscribe(data => {
      this.listProjets = data;    
    })
  }

  private _getLignes(){
    this.api.getAllLigneFromServer().subscribe(data => {
      this.listLignes = data;
      this.dataSource.data = data;
    })
  }

  private _getStatistics(){
    this.api_stat.getTopTenProjet().subscribe(data => {
      this.topProjets = data;

      let nomP: string[] = [];
      for (let index = 0; index < data.length; index++) {
        nomP.push(data[index].nom);
      }

      let tempsP: number[] = [];
      for (let index = 0; index < data.length; index++) {
        tempsP.push((data[index].tempsTotal)/3600);
      }
    

      this.chartOptions = {
        series: [
          {
            data: math.round(tempsP, 2)
          }
        ],
        chart: {
          type: "bar",
          height: 380
        },
        plotOptions: {
          bar: {
            barHeight: "100%",
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: "bottom"
            }
          }
        },
        colors: [
          "#33b2df",
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#2b908f",
          "#f9a3a4",
          "#90ee7e",
          "#f48024",
          "#69d2e7"
        ],
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#fff"]
          },
          formatter: function(val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val + " heures";
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: nomP
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        title: {
          text: "Projets les plus importants",
          align: "center",
          floating: true
        },
        subtitle: {
          text: "en heure(s)",
          align: "center"
        },
        tooltip: {
          theme: "dark",
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function() {
                return "";
              }
            }
          }
        }
      };
    });

    this.api_stat.getTopTenTache().subscribe(data => {
      this.topLignes = data;
    });
  }

  getMoyenneP(element: Projet[]){
    let nbp = element?.length;
    let total = 0;
    for (let index = 0; index < element?.length; index++) {
      total += element[index].tempsTotal;
    }

    return transfoSecEnJHMS(total/nbp);
  }

  getMoyenneL(element: Projet[]){
    let array: number[] = [];
    for (let index = 0; index < element?.length; index++) {
      array.push(element[index].lignesProjetDto.length);
    }

    if (array.length != 0) {
      return math.round(math.mean(array), 3); 
    }
  }

  getMediane(element: Projet[]){
    let arr: number[] = [];

    for (let index = 0; index < element?.length; index++) {
      arr.push(element[index].tempsTotal);
    }

    if (arr.length != 0) {
      return transfoSecEnJHMS(math.median(arr));
    }
  }

  getMostUsedTache(){
    let n = this.listLignes.length;
    let tache: string[] = [];

    for (let index = 0; index < this.listLignes.length; index++) {
      tache.push(this.listLignes[index].tache);
      
    }
    return this._mostFrequent(tache, n);
  }

  private _mostFrequent(arr, n)
  {
         
    // Sort the array
    arr.sort();
        
    // find the max frequency using linear
    // traversal
    let max_count = 1, res = arr[0];
    let curr_count = 1;
        
    for (let i = 1; i < n; i++)
    {
        if (arr[i] == arr[i - 1])
            curr_count++;
        else
        {
            if (curr_count > max_count)
            {
                max_count = curr_count;
                res = arr[i - 1];
            }
            curr_count = 1;
        }
    }
    
    // If last element is most frequent
    if (curr_count > max_count)
    {
        max_count = curr_count;
        res = arr[n - 1];
    }
    return res + " avec " + max_count + " itérations";
  }

  getCount(element: number){
    return transfoSecEnJHMS(element);
  }

  applyDateFilter() {
    console.log(new Date(this.form.value.fromDate).getTime());
    // this.dataSource.data = this.api.getAllLigneFromServer().subscribe();
    this.dataSource.data = this.dataSource.data.filter(e=> new Date(e.dateDebut).getTime() >= new Date(this.form.value.fromDate).getTime()
        && new Date(e.dateFin).getTime() <= new Date(this.form.value.toDate).getTime()
       ); 
  }

  onClear(){
    this.ngOnInit();
  }
  
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
