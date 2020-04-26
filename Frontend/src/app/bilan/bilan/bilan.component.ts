import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import swal from 'sweetalert2';
import { List } from 'src/app/models/list.model';
import { CategoryService } from 'src/app/services/category.service';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css']
})
export class BilanComponent implements OnInit {
  barChartData: ChartDataSets[];
  barChartLabels: Label[] = ['Séries'];
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
            '<label><strong style = "color: #ffd777">Série C</strong>: les tâches non encore réalisées alors que dues sur cette période.</label>',
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
      }
    },
    responsive: true,
    aspectRatio: 1,
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
  pageSize = 8; // nombre de ligne maximal par page
  displayedColumns: string[] = ['Nom', 'Type', 'Category', 'DateDebut',
    'DateFin', 'Percent', 'IsLate']; // les colonnes du tableau
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
  dateDebut: Date;
  dateFin: Date;
  lists: List[];

  constructor(private listService: ListService,
              private categoryService: CategoryService,
              private authentificationService: AuthentificationService) {
    this.listService.getLists(this.authentificationService.id).subscribe((data) => {
      this.lists = ((data.body) as any).Data;
    },
    (err) => {
      console.log(err);
    });
  }

  ngOnInit(): void {
  }

  filterLists(dateDebut: Date, dateFin: Date): any {
    return new Promise((resolve, reject) => {
      const newLists: any[] = [];
      for (let i = 0; i < this.lists.length; i++) {
        if ((new Date(this.lists[i].DateFin) >= dateDebut)
             && (new Date(this.lists[i].DateFin) <= dateFin)) {
               this.categoryService.getCategory(this.lists[i].idCategory).subscribe((info) => {
                 this.lists[i]['Category'] = ((info.body) as any).Data.Nom;
               });
        }
        newLists.push(this.lists[i]);
      }
      resolve([...newLists]);
   });
  } // méthode permettant de filter les taches d'une liste

  filter(value) {
    this.dateDebut = this.changeFormatDate(value.dp3);
    this.dateFin = this.changeFormatDate(value.dp4);
    this.filterLists(this.dateDebut, this.dateFin).then((info) => {
      const lists = info;
      this.dataSource = new MatTableDataSource(lists); // Remplissage du tableau par les données
      this.length = lists.length; // Affectation du nombre de ligne du tableau
    });
    this.barChartData = [
      { data: [this.numberListsDoneWithoutLate()], label: 'Série A' }, // tâches réalisées dans les temps sur cette période
      { data: [this.numberListsDoneWithLate()], label: 'Série B' }, // tâches réalisées en retard sur cette période donnée
      { data: [this.numberListsTodoWithLate()], label: 'Série C' } // tâches non encore réalisées sur cette période alors que dues sur cette période
    ];
  } // méthode permet de filter les taches selon leurs dates de fin

  numberListsDoneWithLate(): number {
    let somme = 0;
    for (let i = 0; i < this.lists.length; i++) {
          if ((new Date(this.lists[i].DateFinExact) <= this.dateFin) && (new Date(this.lists[i].DateFinExact) >= this.dateDebut)) {
             if (new Date(this.lists[i].DateFin) < new Date(this.lists[i].DateFinExact)) {
                   somme = somme + 1;
             }
          }
    }
    return ((somme / this.lists.length) * 100);
  } // méthodes retourne le pourcentage de tâches réalisées en retard sur cette période donnée

  numberListsDoneWithoutLate(): number {
    let somme = 0;
    for (let i = 0; i < this.lists.length; i++) {
          if ((new Date(this.lists[i].DateFinExact) <= this.dateFin) && (new Date(this.lists[i].DateFinExact) >= this.dateDebut)) {
              if (new Date(this.lists[i].DateFin) >= new Date(this.lists[i].DateFinExact)) {
                   somme = somme + 1;
              }
          }
    }
    return ((somme / this.lists.length) * 100);
  } // méthodes retourne le pourcentage de tâches réalisées dans les temps sur cette période

  numberListsTodoWithLate(): number {
    let somme = 0;
    for (let i = 0; i < this.lists.length; i++) {
      if ((new Date(this.lists[i].DateFin) <= this.dateFin) && (new Date(this.lists[i].DateFin) >= this.dateDebut)) {
        if ((new Date(this.lists[i].DateFinExact) >= this.dateFin) || (this.lists[i].DateFinExact === null)) {
               somme = somme + 1;
          }
      }
    }
    return ((somme / this.lists.length) * 100);
  } // méthodes retourne le pourcentage de tâches non encore réalisées sur cette période alors que dues sur cette période
    // les taches dont les dates de réalisation supérieures à la date 2 (deuxième date limite de la période choisie)
    // les taches non encore réalisées alors que la date d'échéance est inclue dans cette période

  changeFormatDate(date: any) {
    const year = date.year;
    const month = date.month;
    const day = date.day;
    return new Date(year, month - 1, day);
  } // méthode permet de transformer un object en une date

  displayCards() {
    if ((this.dateFin !== undefined) || (this.dateDebut !== undefined)) {
        return true;
    } else {
      return false;
    }
  }
}
