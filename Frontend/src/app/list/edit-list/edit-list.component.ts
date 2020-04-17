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
  list: List;
  lists: List[];

  constructor(private dialogRef: MatDialogRef<EditListComponent>,
              private listService: ListService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data !== null) {
        this.list = data.data;
      }
    }

  ngOnInit(): void {
    this.listService.getLists();
    const index = this.lists.indexOf(this.list);
    this.NomList = this.lists[index]['Nom'];
    this.typeList = this.lists[index]['Type'];
    this.CategoryList = this.lists[index]['Category'];
    this.DateDebutList = this.changeDateToNgbDateStruct(this.lists[index]['DateDebut']);
    this.DateFinList = this.changeDateToNgbDateStruct(this.lists[index]['DateFin']);
    this.PercentList = this.lists[index]['Percent'];
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
    const index = this.lists.indexOf(this.list);
    const Nom = value.Nom;
    const Type = value.Type;
    const Category = value.Category;
    const IsDone = this.lists[index]['IsDone'];
    const Percent = value.Percent;
    const isLate = this.listService.getIsLate(this.listService.changeFormatDate(value.dp3),
                                              this.listService.changeFormatDate(value.dp4), value.Percent, Type);
    const dateFinReal = this.listService.getDateFinExact(value.Percent);
    const list = new List(Nom, Type, Category, this.changeNgbDateStructToDate(value.dp3),
                          this.changeNgbDateStructToDate(value.dp4), dateFinReal, IsDone, isLate, Percent);
    this.listService.editList(this.list, list);
    this.dialogRef.close({ action: 1, data: this.listService.lists });
  } // méthode permettant d'ajouter une catégorie à la liste de catégorie

}
