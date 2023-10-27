import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { CSMService } from '@app/services/ui/csm.service';
import { CountryService } from '@app/services/ui/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlansComponent {
  userInfo = {};
  userCurrentPlan: any = {};
  activePlans:any= []; 

  constructor(   private CSMService: CSMService) { }
  @BlockUI() blockUI: NgBlockUI;
  ngOnInit(): void {

    this.CSMService.get({}, null, '/plans?currencyType=IRR').subscribe(data => { 
      this.activePlans = data.content;
    });

  }

}
