/* angular plugin imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  
import { DahsboardModule } from './dashboard/dahsboard.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module'; 
import { UIModule } from './ui/ui.module';
import { UIRoutingModule } from './ui/ui-routing.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule, 
    UIModule,
    UIRoutingModule, 
    DahsboardModule,
    DashboardRoutingModule,
  ],
  providers: [],
  exports: [RouterModule]
})
export class FeatureModule { }
