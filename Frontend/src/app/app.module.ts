import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BilanModule } from './bilan/bilan.module';
import { CategoryModule } from './category/category.module';
import { ListModule } from './list/list.module';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BilanModule,
    CategoryModule,
    ListModule,
    LoginModule,
    SignupModule,
    NgbModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
