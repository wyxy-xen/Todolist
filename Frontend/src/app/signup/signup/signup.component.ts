import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { MustMatch } from './must-match.validator';
import { UserService } from 'src/app/services/user.service';
import { role } from 'src/app/models/user.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  contactForm: FormGroup;
  messageError: string;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      Nom: ['', Validators.required],
      Prenom: ['', Validators.required],
      Email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      Login: ['', [Validators.required]],
      MPasse: ['', [Validators.required, Validators.minLength(8)]],
      CMPasse: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      validator: MustMatch('MPasse', 'CMPasse')
    });
  }

  onSubmit() {
    const nom = this.contactForm.value.Nom;
    const prenom = this.contactForm.value.Prenom;
    const email = this.contactForm.value.Email;
    const login = this.contactForm.value.Login;
    const password = this.contactForm.value.MPasse;
    const Role = role['1'];
    const user = new User(nom, prenom, email, login, password, Role);
    this.userService.addUser(user).subscribe(
      (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      },
      (err) => {
        console.log(err);
        this.messageError = err.error.message;
      }
    );
  }

  onGoBack() {
    this.contactForm.reset();
    this.messageError = null;
  }

  validForm() {
    return this.contactForm.status === 'INVALID';
  }
}
