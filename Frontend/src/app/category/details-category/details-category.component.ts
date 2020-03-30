import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-details-category',
  templateUrl: './details-category.component.html',
  styleUrls: ['./details-category.component.css']
})
export class DetailsCategoryComponent implements OnInit {
  nomCategory: string;
  typeCategory: string;
  index: number;
  constructor(private dialogRef: MatDialogRef<DetailsCategoryComponent>,
              private categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                if (data !== null) {
                this.index = data.data;
              } }

  ngOnInit(): void {
    const categories: Category[] = this.categoryService.getCategories();
    console.log('categories', categories);
    this.nomCategory = categories[this.index]['Nom'];
    this.typeCategory = categories[this.index]['Type'];
  } // méthode permettant d'affecter des valeurs aux proprietés

  closeModal() {
    this.dialogRef.close();
  } // méthode permettant la fermeture la fenetre popup

}
