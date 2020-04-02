import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { spot } from '../models/list.enum';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  lists: List[] = [
    new List('entretien d\'embauche', spot['0'], 'aaggga', new Date(), new Date(), false, 'en retard', 100),
    new List('réunion du travail', spot['1'], 'ffagga', new Date(), new Date(), false, 'en avance', 50),
    new List('présentation devant le public', spot['0'], 'ghhhhh', new Date(), new Date(), false, 'en retard', 0)
  ];
  constructor() { }

  getLists() {
    return this.lists;
  } // méthode permettant de récupérer le tableau de taches

  addList(list: List) {
    this.lists.push(list);
    console.log(this.lists);
  } // méthode permettant d'ajouter une catégorie au tableau de taches

  deleteList(list: List) {
    const index = this.lists.indexOf(list);
    this.lists.splice(index, 1);
  } // méthode permettant de supprimer une tache du tableau de taches

  editList(exList: List, list: List) {
    const index = this.lists.indexOf(exList);
    this.lists.splice(index, 1, list);
  } // méthode permettant de modifier une tache dans le tableau de taches

  changeToDoneList(list: List) {
    const index = this.lists.indexOf(list);
    const oneList = this.lists[index];
    oneList.IsDone = true;
    this.lists.splice(index, 1, oneList);
  } // méthode permettant de rendre la tache à réaliser une tache réalisée
}
