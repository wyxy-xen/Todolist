import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  length: number; // nombre de ligne  du tableau
  pageSize = 4; // nombre de ligne maximal par page
  displayedColumns: string[] = ['Checkbox', 'Nom', 'Type', 'Category', 'DateDebut',
                                'DateFin', 'Percent', 'IsLate', 'Action']; // les colonnes du tableau
  dataSource = new MatTableDataSource([]); // Data du tableau

  private paginator: MatPaginator;
  private sort: any;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  } // pagination
  @ViewChild(MatSort, { static: true }) set content(content: ElementRef) {
    this.sort = content;
    this.dataSource.sort = this.sort;
  } // tri
  constructor(private listService: ListService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.updateData();
  }

  updateData() {
    this.length = this.listService.lists.length; // Affectation du nombre de ligne du tableau
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.listService.lists.length; i++) {
       // tslint:disable-next-line: no-string-literal
       this.listService.lists[i]['Action'] = i; // ajout de l'espace entre les deux boutons
       this.listService.lists[i]['Checkbox'] = '';
    }
    this.dataSource = new MatTableDataSource(this.listService.lists); // Remplissage du tableau par les données
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  } // méthode permettant de filter le tableau lorsque le client écrit dans la barre de recherche

  openModal(dialogConfig: MatDialogConfig) {
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (screen.width <= 600) {
      dialogConfig.width = '99%';
    } else {
      dialogConfig.width = '50%';
    }
  } // méthode permettant d'ouvrir une fentre popup dans la page

  makestateList(isLate: boolean): string {
    if (isLate) {
      return 'en retard';
    } else {
      return 'en avance';
    }
  }

  addList() {

  }

  deleteList(index) {

  }

  editList(index) {

  }

  detailsList(index) {

  }

}
