import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { MatDialog } from '@angular/material/dialog';
import { List } from 'src/app/models/list.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import swal from 'sweetalert2';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css']
})
export class BilanComponent implements OnInit {
  barChartData: ChartDataSets[] = [
    { data: [65], label: 'Série A' },
    { data: [28], label: 'Série B' },
    { data: [38], label: 'Série C' },
    { data: [77], label: 'Série D' }
  ];
  barChartLabels: Label[] = ['Date'];
  barChartOptions: ChartOptions = {
    legend: {
      position: 'right',
      align: 'start',
      onHover: (event) => {
        swal.fire({
          title: '<strong>Légende de diagramme</strong>',
          icon: 'info',
          html:
          '<br>' + '<label><strong style = "color: #ff829c">Série A</strong>: les tâches réalisées dans les temps.</label>' +
          '<label><strong style = "color: #5eb4ef">Série B</strong>: les tâches réalisées en retard.</label>' +
          '<label><strong style = "color: #ffd777">Série C</strong>: les tâches non encore réalisées alors que dues sur cette période.</label>' +
          '<label><strong style = "color: #ebedf0">Série D</strong>: les tâches non encore réalisées alors que dues après cette période.</label>',
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Super!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'
        });
        /*Série A: les tâches réalisées dans les temps.
        Série B: les tâches réalisées en retard.
        Série C: les tâches non encore réalisées alors que dues sur cette période.
        Série D: les tâches non encore réalisées alors que dues après cette période.*/

      }
    },
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Pourcentage (%)'
        }
      }]
    }
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  length: number; // nombre de ligne  du tableau
  pageSize = 4; // nombre de ligne maximal par page
  displayedColumns: string[] = ['Nom', 'Type', 'Category', 'DateDebut',
    'DateFin', 'Percent', 'IsLate', 'Action']; // les colonnes du tableau
  dataSource = new MatTableDataSource([]); // Data du tableau

  private paginator: MatPaginator;
  private sort: any;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  } // pagination
  @ViewChild(MatSort, { static: false }) set content(content: ElementRef) {
    this.sort = content;
    this.dataSource.sort = this.sort;
  } // tri

  constructor(private listService: ListService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  updateData() {
    const newLists: List[] = [];
    for (let i = 0; i < this.listService.lists.length; i++) {
      this.listService.changeToLateList(this.listService.lists[i]);
      newLists.push(this.listService.lists[i]);
    }
    for (let j = 0; j < newLists.length; j++) {
      // tslint:disable-next-line: no-string-literal
      newLists[j]['Action'] = j; // ajout de l'espace entre les deux boutons
      newLists[j]['Checkbox'] = '';
    }
    this.dataSource = new MatTableDataSource(newLists); // Remplissage du tableau par les données
    this.length = newLists.length; // Affectation du nombre de ligne du tableau
    // tslint:disable-next-line: prefer-for-of
  }

  deleteList(list) {

  }

  detailsList(list) {

  }

}
