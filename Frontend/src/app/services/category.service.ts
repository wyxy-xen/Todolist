import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  hostAdress = 'http://localhost:4000/api/category';
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.hostAdress, {observe: 'response'});
  } // méthode permettant de récupérer le tableau de catégories

  getCategory(index: number) {
    return this.http.get(this.hostAdress + '/' + index, {observe: 'response'});
  } // méthode permettantde récupérer une catégorie par l'intermédiaire de son id

  addCategory(category: Category, image: File) {
    return new Promise((resolve, reject) => {
      const thingData = new FormData();
      thingData.append('thing', JSON.stringify(category));
      thingData.append('image', image, category.Nom);
      this.http.post(this.hostAdress, thingData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  } // méthode permettant d'ajouter une catégorie au tableau de catégories

  deleteCategory(index: number) {
    return this.http.delete(this.hostAdress + '/' + index);
  } // méthode permettant de supprimer une catégorie du tableau de catégories

  editCategory(index: number, category: Category, image: File) {
      const thingData = new FormData();
      if (image !== null) {
        thingData.append('image', image, category.Nom);
      }
      thingData.append('thing', JSON.stringify(category));
      return this.http.put(this.hostAdress + '/' + index, thingData);
  } // méthode permettant de modifier une catégorie dans le tableau de catégories
}
