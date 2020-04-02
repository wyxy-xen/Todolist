import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { MatDialogRef } from '@angular/material/dialog';
import { ListService } from 'src/app/services/list.service';
import { CategoryService } from 'src/app/services/category.service';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {
  typeList: string = 'ponctuel';
  categories: Category[];
  dateDebut: Date = new Date();
  constructor(private dialogRef: MatDialogRef<AddListComponent>,
              private listService: ListService,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  closeModal() {
    this.dialogRef.close();
  }

  onAddList(value) {
    const nom = value.Nom;
    const type = value.Type;
    const category = value.Category;
    const dateDebut = this.changeFormatDate(value.dp3);
    const dateFin = this.changeFormatDate(value.dp4);
    const percent = value.Percent;
    const list = new List(nom, type, category, dateDebut, dateFin, false, 'en avance', percent);
    console.log('list', list);
    this.listService.addList(list);
    this.dialogRef.close({action: 1, data: this.listService.lists});
  }

  changeFormatDate(date: any) {
    const year = date.year;
    const month = date.month;
    const day = date.day;
    return new Date(year + '-' + month + '-' + day);
  }

}
