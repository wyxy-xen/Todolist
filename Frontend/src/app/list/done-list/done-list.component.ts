import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListService } from 'src/app/services/list.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { List } from 'src/app/models/list.model';
import { DeleteListComponent } from '../delete-list/delete-list.component';
import { DetailsListComponent } from '../details-list/details-list.component';

@Component({
  selector: 'app-done-list',
  templateUrl: './done-list.component.html',
  styleUrls: ['./done-list.component.css']
})
export class DoneListComponent implements OnInit, AfterViewInit {

  length: number; // nombre de ligne  du tableau
  pageSize = 4; // nombre de ligne maximal par page
  displayedColumns: string[] = ['Nom', 'Type', 'Category', 'DateDebut',
    'DateFin', 'Action']; // les colonnes du tableau
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
              private matDialog: MatDialog) {
  }


  ngOnInit(): void {
    this.updateData();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = this.pageSize;
    });
  }

  updateData() {
    const newLists: List[] = [];
    for (let i = 0; i < this.listService.lists.length; i++) {
        if (this.listService.lists[i].IsDone === true) {
          newLists.push(this.listService.lists[i]);
        }
    }
    for (let j = 0; j < newLists.length; j++) {
      // tslint:disable-next-line: no-string-literal
      newLists[j]['Action'] = j; // ajout de l'espace entre les deux boutons
    }
    this.dataSource = new MatTableDataSource(newLists); // Remplissage du tableau par les données
    this.length = newLists.length; // Affectation du nombre de ligne du tableau
    // tslint:disable-next-line: prefer-for-of
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
      dialogConfig.width = '60%';
    }
  } // méthode permettant d'ouvrir une fentre popup dans la page

  deleteList(list) {
    const dialogConfig = new MatDialogConfig();
    this.openModal(dialogConfig);
    dialogConfig.data = { data: list };
    const dialogRef = this.matDialog.open(DeleteListComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          if (data.action === 1) {
            this.updateData(); // mise à jour de la base de données
            this.dataSource.paginator = this.paginator; // mise à jour de la pagination
            this.dataSource.sort = this.sort; // mise à jour de tri
          }
        }
      }
    ); // exécuter la fonction callback après la fermeture de la fenetre popup
  } // méthode permettant d'ouvrir le composant DeleteList
  // et de supprimer une tache après la fermétrure de fenetre popup

  detailsList(list) {
    const dialogConfig = new MatDialogConfig();
    this.openModal(dialogConfig);
    dialogConfig.data = { data: list, info: 'doneList' };
    const dialogRef = this.matDialog.open(DetailsListComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          if (data.action === 1) {
            this.updateData(); // mise à jour de la base de données
            this.dataSource.paginator = this.paginator; // mise à jour de la pagination
            this.dataSource.sort = this.sort; // mise à jour de tri
          }
        }
      }
    ); // exécuter la fonction callback après la fermeture de la fenetre popup
  } // méthode permettant d'ouvrir le composant DetailsList
  // et d'afficher les détails de la tache après la fermétrure de fenetre popup

}
