import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Category[] = [
    new Category('stretching', 'personnel', 'hsnsbvsgdhgfdv'),
    new Category('musculation', 'personnel', 'hsnsbvsgdhgfdv'),
    new Category('footing', 'personnel', 'hsnsbvsgdhgfdv'),
    new Category('football', 'personnel', 'hsnsbvsgdhgfdv'),
    new Category('kung fu', 'personnel')
  ];
  constructor() { }

  getCategories() {
    return this.categories;
  } // méthode permettant de récupérer le tableau de catégories

  addCategory(category: Category) {
    this.categories.push(category);
  } // méthode permettant d'ajouter une catégorie au tableau de catégories

  deleteCategory(index: number) {
    this.categories.splice(index, 1);
  } // méthode permettant de supprimer une catégorie du tableau de catégories
}
