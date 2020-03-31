import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  } // méthode permettant de filter le tableau lorsque le client écrit dans la barre de recherche

  addList() {

  }

  deleteList(index) {

  }

  editList(index) {

  }

  detailsList(index) {

  }

}
