import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  length: number; // nombre de ligne  du tableau
  pageSize = 4; // nombre de ligne maximal par page
  displayedColumns: string[] = ['Nom', 'Type', 'Photo', 'Action']; // les colonnes du tableau
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
  constructor(private categoryService: CategoryService, private matDialog: MatDialog) {
    this.updateData();
  }

  updateData() {
    this.length = this.categoryService.categories.length; // Affectation du nombre de ligne du tableau
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.categoryService.categories.length; i++) {
       // tslint:disable-next-line: no-string-literal
       this.categoryService.categories[i]['Action'] = ' '; // ajout de l'espace entre les deux boutons
    }
    this.dataSource = new MatTableDataSource(this.categoryService.categories); // Remplissage du tableau par les données
  }

  ngOnInit(): void {
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  } // fonction permettant de filter le tableau lorsque le client écrit dans la barre de recherche

  openModal(dialogConfig: MatDialogConfig) {
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (screen.width <= 600) {
      dialogConfig.width = '99%';
    } else {
      dialogConfig.width = '50%';
    }
  }

  addCategory() {
    const dialogConfig = new MatDialogConfig();
    this.openModal(dialogConfig);
    const dialogRef = this.matDialog.open(AddCategoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          if (data.action === 1) {
           
          }
        }
      }
    );
  }

}
