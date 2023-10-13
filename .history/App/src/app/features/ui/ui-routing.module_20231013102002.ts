import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { Title } from "@angular/platform-browser";
import { TitleStrategy,  RouterStateSnapshot } from "@angular/router"; 
import { AboutComponent } from './about/about.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { VerifyComponent } from './verify-code/verify.component';
import { VerifyForgetPasswordComponent } from './verify-code-forget-pass/verify.component';

 
const routes: Routes = [
  { path: "",  title: "HSFIND" , component: HomePageComponent },
  { path: "Login",  title: "Login" , component: LoginComponent },
  { path: "Register",  title: "ثبت نام" , component: SignupComponent }, 
  { path: "Verify/:userId",  title: "کد تایید حساب کاربری" , component: VerifyComponent }, 
  { path: "ForgotPass",  title: "بازیابی رمز عبور" , component: ForgotPassComponent }, 
  { path: "ForgotPassVerify/:userId",  title: "کد تایید بازیابی رمز عبور" , component: VerifyForgetPasswordComponent },  
  { path: "AboutUs",  title: "درباره ما" , component: AboutComponent }, 
];

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title}`);
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class UIRoutingModule { }
