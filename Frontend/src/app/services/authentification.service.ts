import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  jwt: string = undefined;
  id: any = undefined;
  ID_USER = '99999999999';
  role: string = undefined;
  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loadToken();
  }

  saveId(id: any) {
    localStorage.setItem('id', id);
    this.loadId();
  }

  saveRole(Role: string) {
    localStorage.setItem('Role', Role);
    this.loadRole();
  }

  isAdministrator() {
    return ((this.id === this.ID_USER) || (this.role === 'admin'));
  }

  isAuthentified() {
     return ((this.jwt !== undefined) && (this.jwt !== null));
  }

  loadId() {
    this.id = localStorage.getItem('id');
  }

  loadRole() {
    this.role = localStorage.getItem('Role');
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.jwt = undefined;
    this.id = undefined;
    this.role = undefined;
  }

}

