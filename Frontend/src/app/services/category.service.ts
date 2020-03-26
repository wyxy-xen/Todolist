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
  }

  addCategory(category: Category) {
    this.categories.push(category);
  }
}
