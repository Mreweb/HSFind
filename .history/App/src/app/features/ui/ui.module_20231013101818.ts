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
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { VerifyComponent } from './verify-code/verify.component';
import { VerifyForgetPasswordComponent } from './verify-code-forget-pass/verify.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomePageComponent,
    ForgotPassComponent,
    VerifyForgetPasswordComponent,
    HeaderSiteComponent,
    AboutComponent,
    VerifyComponent,
    FooterSiteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIRoutingModule  
  ],
  providers: [CustomerService],
  exports: [RouterModule]
})
export class UIModule { }
