import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListService } from 'src/app/services/list.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { List } from 'src/app/models/list.model';
import { DeleteListComponent } from '../delete-list/delete-list.component';
import { DetailsListComponent } from '../details-list/details-list.component';
import { element } from 'protractor';
import { AuthentificationService } from 'src/app/services/authentification.service';

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
              private matDialog: MatDialog,
              private authentificationService: AuthentificationService) {
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
    this.listService.getLists(this.authentificationService.id).subscribe((data) => {
      const lists = ((data.body) as any).Data;
      const newLists: List[] = [];
      for (let i = 0; i < lists.length; i++) {
        lists[i]['Action'] = i;
        // tslint:disable-next-line: no-string-literal
        if (lists[i].IsDone === true) {
          // ajout de l'espace entre les deux boutons
          newLists.push(lists[i]);
        }
      }
      this.length = newLists.length;
      this.dataSource = new MatTableDataSource(newLists); // Remplissage du tableau par les données
      this.dataSource.paginator = this.paginator; // mise à jour de la pagination
      this.dataSource.sort = this.sort; // mise à jour de tri
    },
    (err) => {
      console.log('erreur est la suivante: ', err);
    });
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

  deleteList(elem) {
    const dialogConfig = new MatDialogConfig();
    this.openModal(dialogConfig);
    dialogConfig.data = { data: elem.id };
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

  detailsList(elem) {
    const dialogConfig = new MatDialogConfig();
    this.openModal(dialogConfig);
    dialogConfig.data = { data: elem.id, info: 'doneList' };
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
