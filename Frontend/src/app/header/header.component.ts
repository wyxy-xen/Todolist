import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService,
              private router: Router) { }

  ngOnInit(): void {
    this.authentificationService.loadToken(); // Télécharger le token à chaque chargement d'une page
    this.authentificationService.loadId(); // Télécharger le id d'utilisateur à chaque chargement d'une page
    this.authentificationService.loadRole(); // Télécharger le role d'utilisateur à chaque chargement d'une page
  }

  logout() {
    this.authentificationService.logout();
    this.router.navigateByUrl('/login');
 } // méthode permettant de déconnecter de l'application

 isAdministrator() {
   return this.authentificationService.isAdministrator();
 }

 isAuthentified() {
    return this.authentificationService.isAuthentified();
 } // méthode permettant de retourner une variable booléenne déterminant,
   // si l'utilisateur est authentifié ou pas

}
