/* angular plugin imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  
import { FooterSiteComponent } from './footer-site/footer-site.component';
import { AboutComponent } from './about/about.component';
import { HeaderSiteComponent } from './header-site/header-site.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UIRoutingModule } from './ui-routing.module';
import { AllPersonService } from '@app/services/all-person.service';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomePageComponent,
    ForgotPassComponent,
    HeaderSiteComponent,
    AboutComponent,
    FooterSiteComponent
  ],
  imports: [
    CommonModule,
    UIRoutingModule  
  ],
  providers: [AllPersonService],
  exports: [RouterModule]
})
export class UIModule { }
