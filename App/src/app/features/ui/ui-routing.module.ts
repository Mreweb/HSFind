import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { Title } from "@angular/platform-browser";
import { TitleStrategy,  RouterStateSnapshot } from "@angular/router"; 
import { AboutComponent } from './about/about.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './search/home-page/home-page.component';
import { VerifyComponent } from './verify-code/verify.component';
import { VerifyForgetPasswordComponent } from './verify-code-forget-pass/verify.component';
import { AuthGuard } from 'src/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SearchEngineComponent } from './search/search-engine/search-engine.component';
import { ProductDetailComponent } from './search/product-detail/detail.component';
import { ProductRequirmentDetailComponent } from './search/product-requirment-detail/detail.component';
import { ProductCodeDetailComponent } from './search/product-code-detail/detail.component';
import { ProductTariffDetailComponent } from './search/product-tariff-detail/detail.component';
import { ProfileInfoComponent } from './profile/info/profile-info.component';

 
const routes: Routes = [
  { path: "",  title: "جستجوی محصول" , component: HomePageComponent },
  { path: "Login",  title: "ورود" , component: LoginComponent },
  { path: "Register",  title: "ثبت نام" , component: SignupComponent }, 
  { path: "Verify/:userId",  title: "کد تایید حساب کاربری" , component: VerifyComponent }, 
  { path: "ForgotPass",  title: "بازیابی رمز عبور" , component: ForgotPassComponent }, 
  { path: "ForgotPassVerify/:userId",  title: "کد تایید بازیابی رمز عبور" , component: VerifyForgetPasswordComponent },  
  { path: "AboutUs",  title: "درباره ما" , component: AboutComponent }, 
  { path: "Forbidden",  title: "عدم احراز جهت دسترسی سه سایت" , component: ForbiddenComponent }, 
  
  { path: "SearchEngine/:search",  title: "جستجوی محصول" , component: SearchEngineComponent }, 
  { path: "SearchEngine/productDetail/:typeId",  title: "جستجوی محصول" , component: ProductDetailComponent }, 
  { path: "SearchEngine/productCodeDetail/:htsCode/:countryCode",  title: "جستجوی محصول" , component: ProductCodeDetailComponent }, 
  { path: "SearchEngine/productRequiermentDetail/:htsCode/:countryCode",  title: "جستجوی محصول" , component: ProductRequirmentDetailComponent }, 
  { path: "SearchEngine/productTarrifsDetail/:htsCode/:countryCode",  title: "جستجوی محصول" , component: ProductTariffDetailComponent }, 
  
  { path: "Profile",  title: "پروفایل کابری" , component: ProfileInfoComponent }, 

  
  
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
