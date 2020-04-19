import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  hostAdress = 'http://localhost:4000/api/user';
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.hostAdress, {observe: 'response'});
  } // méthode permettant de récupérer le tableau de taches

  getUser(id: any) {
    return this.http.get(this.hostAdress + '/' + id, {observe: 'response'});
  } // méthode permettant de récupérer une tache de la base de données

  addUser(user: User) {
    return this.http.post(this.hostAdress, user, {observe: 'response'});
  } // méthode permettant d'ajouter une catégorie au tableau de taches

  deleteUser(id: any) {
    return this.http.delete(this.hostAdress + '/' + id);
  } // méthode permettant de supprimer une tache du tableau de taches

  editUser(id: any, user: User) {
    return this.http.put(this.hostAdress + '/' + id, user, {observe: 'response'});
  } // méthode permettant de modifier une tache dans le tableau de taches
}
