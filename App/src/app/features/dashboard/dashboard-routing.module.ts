import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { TitleStrategy,  RouterStateSnapshot } from "@angular/router";   
import { OutletComponent } from './dashboard-components/outlet/outlet.component';
import { HomeComponent } from './dashboard-components/home/home.component';
import { ProfileComponent } from './dashboard-components/profile/profile.component';
import { LayoutComponent } from './dashboard-components/layout/layout/layout.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,//   
    data: { title: "پیشخوان" }, 
    children: [
      {
        path: 'Dashboard',
        component: OutletComponent,//
        children: [
          { path: 'Home',component: HomeComponent, title: "فهرست سازمان" },
          { path: 'Profile', component: ProfileComponent, title: "پروفایل کاربری" }
        ]
      }
    ]
  } 
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class DashboardRoutingModule { }
