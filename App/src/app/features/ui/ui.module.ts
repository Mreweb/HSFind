/* angular plugin imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  
import { NgSelectModule } from '@ng-select/ng-select';
import { FooterSiteComponent } from './footer-site/footer-site.component';
import { AboutComponent } from './about/about.component';
import { HeaderSiteComponent } from './header-site/header-site.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { HomePageComponent } from './search/home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UIRoutingModule } from './ui-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { VerifyComponent } from './verify-code/verify.component';
import { VerifyForgetPasswordComponent } from './verify-code-forget-pass/verify.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ProductService } from '@app/services/ui/product.service';
import { SearchEngineComponent } from './search/search-engine/search-engine.component';
import { ProductDetailComponent } from './search/product-detail/detail.component';
import { ProductCodeDetailComponent } from './search/product-code-detail/detail.component';
import { ProductRequirmentDetailComponent } from './search/product-requirment-detail/detail.component';
import { ProductTariffDetailComponent } from './search/product-tariff-detail/detail.component';
import { ProfileInfoComponent } from './profile/info/profile-info.component';
import { CSMService } from '@app/services/ui/csm.service';
import { CountryService } from '@app/services/ui/country.service';
import { PlanListComponent } from './profile/plan-list/plan-list.component';
import { ProfileSideBarComponent } from './profile/sidebar/sidebar.component';
import { PlansComponent } from './plans/plan.component';
import { PlanBuyComponent } from './profile/plan-list/buy/plan-buy.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { PlanBuyResultComponent } from './profile/plan-list/result/result.component';
import { ActivePlansComponent } from './profile/plan-list/active-plans/plan-list.component';
import { RulesComponent } from './rules/rules.component';
import { ContactComponent } from './contact_us/contact.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomePageComponent,
    ForgotPassComponent,
    VerifyForgetPasswordComponent,
    HeaderSiteComponent,
    AboutComponent,
    RulesComponent,
    ContactComponent,
    VerifyComponent,
    FooterSiteComponent,
    ForbiddenComponent,
    SearchEngineComponent,
    ProductDetailComponent,
    ProductCodeDetailComponent,
    ProductRequirmentDetailComponent,
    ProductTariffDetailComponent,
    PlansComponent,
    PlanBuyComponent,
    PlanBuyResultComponent,
    ActivePlansComponent,

    /*Profile*/
    ProfileSideBarComponent,
    ProfileInfoComponent,
    PlanListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgPersianDatepickerModule,
    UIRoutingModule  
  ],
  providers: [CustomerService , ProductService , CSMService , CountryService],
  exports: [RouterModule]
})
export class UIModule { }
