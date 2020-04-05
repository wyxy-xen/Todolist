import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { MatDialog } from '@angular/material/dialog';
import { List } from 'src/app/models/list.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css']
})
export class BilanComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];
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
