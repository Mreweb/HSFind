import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { CSMService } from '@app/services/ui/csm.service';
import { CountryService } from '@app/services/ui/country.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-profile-info',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class ActivePlansComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private CSMService: CSMService,
    private CountryService: CountryService,
    private toastr: ToastrService
  ) { }
  @BlockUI() blockUI: NgBlockUI;

  

  userInfo = {};
  userCurrentPlan: any = {};
  activePlans:any= [];
  pageForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    countryCode: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    personType: new FormControl('Individual', [Validators.required])
  });


  ngOnInit(): void {

    this.CSMService.get({}, null, '/plans?currencyType=IRR').subscribe(data => { 
      this.activePlans = data.content;
       
    });

    this.CSMService.get({}, null, '/plans/my').subscribe(data => {
      this.userCurrentPlan = data.content.data || [];
     });

  }


  doSave() {
  
    
    if (!this.pageForm.valid) {
      this.toastr.error('خطا در ثبت نام', 'ورودی ها نامعتبر هستند');
    } else {
      this.blockUI.start();
      this.CSMService.put(this.pageForm.value, null, "/customers/individual").subscribe(
        data => {
          this.blockUI.stop();
          this.toastr.info(data.message);
        },
        error => {
          this.blockUI.stop();
          this.toastr.info(error.error.message);
        }
      );
    }
  }
}