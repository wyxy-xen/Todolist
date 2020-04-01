import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ListService } from 'src/app/services/list.service';
import { AddListComponent } from '../add-list/add-list.component';
import { DeleteListComponent } from '../delete-list/delete-list.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, AfterViewInit {
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
  @ViewChild(MatSort, { static: false }) set content(content: ElementRef) {
    this.sort = content;
    this.dataSource.sort = this.sort;
  } // tri
  constructor(private listService: ListService, private matDialog: MatDialog) { }

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
      dialogConfig.width = '60%';
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
    const dialogConfig = new MatDialogConfig();
    this.openModal(dialogConfig);
    const dialogRef = this.matDialog.open(AddListComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          if (data.action === 1) {
            this.dataSource.connect().next(data.data); // mise à jour de la base de données
            this.dataSource.paginator = this.paginator; // mise à jour de la pagination
            this.dataSource.sort = this.sort; // mise à jour de tri
          }
        }
      }
    ); // exécuter la fonction callback après la fermeture de la fenetre popup
  } // méthode permettant d'ouvrir le composant AddList et d'ajouter la tache à la liste après la ferméture de fenetre popup

  deleteList(index) {
    const dialogConfig = new MatDialogConfig();
    this.openModal(dialogConfig);
    dialogConfig.data = {data: index};
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
  }

  editList(index) {

  }

  detailsList(index) {

  }

}
