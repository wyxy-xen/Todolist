import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']
})
export class AdministrateurComponent implements OnInit, AfterViewInit {
  length: number; // nombre de ligne  du tableau
  pageSize = 4; // nombre de ligne maximal par page
  displayedColumns: string[] = ['Nom', 'Prenom', 'Email', 'Login',
    'Role', 'Action']; // les colonnes du tableau
  dataSource = new MatTableDataSource([]); // Data du tableau

  private paginator: MatPaginator;
  private sort: any;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  } // pagination
  @ViewChild(MatSort, { static: false }) set content(content: ElementRef) {
    this.sort = content;
    this.dataSource.sort = this.sort;
  } // tri
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.updateData();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = this.pageSize;
    });
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  } // méthode permettant de filter le tableau lorsque le client écrit dans la barre de recherche


  updateData() {
    this.userService.getUsers().subscribe((data) => {
      const users = ((data.body) as any).Data;
      const newUsers: User[] = [];
      for (let i = 0; i < users.length; i++) {
        users[i]['Action'] = i;
        newUsers.push(users[i]);
      }
      this.length = newUsers.length;
      this.dataSource = new MatTableDataSource(newUsers); // Remplissage du tableau par les données
      this.dataSource.paginator = this.paginator; // mise à jour de la pagination
      this.dataSource.sort = this.sort; // mise à jour de tri
    },
      (err) => {
        console.log('erreur est la suivante: ', err);
      });
  }

  changeAdmin(elem) {
    const id = elem.id;
    const Nom = elem.Nom;
    const Prenom = elem.Prenom;
    const Email = elem.Email;
    const Login = elem.Login;
    const MPasse = elem.Mpasse;
    let Role;
    if (elem.Role === 'admin') {
      Role = 'user';
    } else if (elem.Role === 'user') {
      Role = 'admin';
    }
    const user = new User(Nom, Prenom, Email, Login, MPasse, Role);
    this.userService.editUser(id, user).subscribe((data) => {
        console.log(data);
        this.updateData();
    },
    (err) => {
     console.log(err);
   });
  }
}
