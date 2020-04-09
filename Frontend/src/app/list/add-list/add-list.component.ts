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
  } // méthode permettant de fermer une fenetre modale

  onAddList(value) {
    const nom = value.Nom;
    const type = value.Type;
    const category = value.Category;
    const isLate = this.listService.getIsLate(this.listService.changeFormatDate(value.dp3),
                                              this.listService.changeFormatDate(value.dp4), value.Percent, type);
    // affecter la valeur de la proprieté IsLate
    const dateFinReal = this.listService.getDateFinExact(value.Percent);
    this.listService.addList(new List(nom, type, category, this.listService.changeFormatDate(value.dp3),
                                      this.listService.changeFormatDate(value.dp4), dateFinReal, false, isLate, value.Percent));
    this.dialogRef.close({ action: 1, data: this.listService.lists });
  } // méthode permettant d'ajouter une tache à la liste de taches et de fermer la fenetre par la suite

}
