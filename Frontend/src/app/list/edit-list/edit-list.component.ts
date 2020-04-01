import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})

export class EditListComponent implements OnInit {
  NomList: string;
  typeList: string;
  CategoryList: string;
  DateDebutList: NgbDateStruct;
  DateFinList: NgbDateStruct;
  PercentList: number;
  index: number;
  lists: List[];

  constructor(private dialogRef: MatDialogRef<EditListComponent>,
              private listService: ListService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data !== null) {
        this.index = data.data;
      }
    }

  ngOnInit(): void {
    this.lists = this.listService.getLists();
    this.NomList = this.lists[this.index]['Nom'];
    this.typeList = this.lists[this.index]['Type'];
    this.CategoryList = this.lists[this.index]['Category'];
    this.DateDebutList = this.changeDateToNgbDateStruct(this.lists[this.index]['DateDebut']);
    this.DateFinList = this.changeDateToNgbDateStruct(this.lists[this.index]['DateFin']);
    this.PercentList = this.lists[this.index]['Percent'];
  }

  changeDateToNgbDateStruct(date: Date): NgbDateStruct {
    return { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()};
  }

  changeNgbDateStructToDate(date: any): Date {
    const year = date.year;
    const month = date.month;
    const day = date.day;
    return new Date(year + '-' + month + '-' + day);
  }

  closeModal() {
    this.dialogRef.close();
  }

  onEditList(value) {
    const Nom = value.Nom;
    const Type = value.Type;
    const Category = value.Category;
    const DateDebut = this.changeNgbDateStructToDate(value.dp3);
    const DateFin = this.changeNgbDateStructToDate(value.dp4);
    const IsDone = false;
    const IsLate = this.lists[this.index]['IsLate'];
    const Percent = value.Percent;
    const list = new List(Nom, Type, Category, DateDebut, DateFin, IsDone, IsLate, Percent);
    this.listService.editList(this.index, list);
    this.dialogRef.close({ action: 1, data: this.listService.lists });
  } // méthode permettant d'ajouter une catégorie à la liste de catégorie

}
