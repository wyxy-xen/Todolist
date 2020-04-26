import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  jwt: string = undefined;
  id: any = undefined;
  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loadToken();
  }

  saveId(id: any) {
    localStorage.setItem('id', id);
    this.loadId();
  }

  isAuthentified() {
     return ((this.jwt !== undefined) && (this.jwt !== null));
  }

  loadId() {
    this.id = localStorage.getItem('id');
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.jwt = undefined;
    this.id = undefined;
  }

}

