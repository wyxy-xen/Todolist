import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  hostAdress = 'http://localhost:4000/api/user';
  loginAdress = 'http://localhost:4000/api/login';
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.hostAdress, {observe: 'response'});
  } // méthode permettant de récupérer le tableau des utilisateurs

  getUser(id: any) {
    return this.http.get(this.hostAdress + '/' + id, {observe: 'response'});
  } // méthode permettant de récupérer un utilisateur de la base de données

  addUser(user: User) {
    return this.http.post(this.hostAdress, user, {observe: 'response'});
  } // méthode permettant d'ajouter un utilisateur au tableau de utilisateurs

  deleteUser(id: any) {
    return this.http.delete(this.hostAdress + '/' + id);
  } // méthode permettant de supprimer un utilisateur du tableau de tautilisateursches

  editUser(id: any, user: User) {
    return this.http.put(this.hostAdress + '/' + id, user, {observe: 'response'});
  } // méthode permettant de modifier un utilisateur dans le tableau des utilisateurs

  connection(object: any) {
    return this.http.post(this.loginAdress, object, {observe: 'response'});
  }
}
