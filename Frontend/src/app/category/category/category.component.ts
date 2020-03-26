import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/services/category.service';

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
  constructor(private categoryService: CategoryService) {
    this.length = this.categoryService.input.length; // Affectation du nombre de ligne du tableau
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.categoryService.input.length; i++) {
       // tslint:disable-next-line: no-string-literal
       this.categoryService.input[i]['Action'] = ' '; // ajout de l'espace entre les deux boutons
    }
    this.dataSource = new MatTableDataSource(this.categoryService.input); // Remplissage du tableau par les données
  }

  ngOnInit(): void {
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  } // fonction permettant de filter le tableau lorsque le client écrit dans la barre de recherche

}
