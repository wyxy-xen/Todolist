import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { MatDialogRef } from '@angular/material/dialog';
import { ListService } from 'src/app/services/list.service';
import { CategoryService } from 'src/app/services/category.service';
import { List } from 'src/app/models/list.model';
import { spot } from 'src/app/models/list.enum';

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
    const isLate = this.listService.getIsLate(this.listService.changeFormatDate(value.dp3),
                                              this.listService.changeFormatDate(value.dp4), value.Percent, type);
    const list = new List(nom, type, category, this.listService.changeFormatDate(value.dp3),
    this.listService.changeFormatDate(value.dp4), false, isLate, value.Percent);
    this.listService.addList(list);
    this.dialogRef.close({ action: 1, data: this.listService.lists });
  }

}
