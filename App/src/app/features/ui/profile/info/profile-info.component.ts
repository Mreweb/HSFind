import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { CSMService } from '@app/services/ui/csm.service';
import { CountryService } from '@app/services/ui/country.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private CSMService: CSMService,
    private CountryService: CountryService,
    private toastr: ToastrService
  ) { }
  @BlockUI() blockUI: NgBlockUI; 
  countryId = 0;
  contries:any = [];

  userInfo = {};
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
    personType: new FormControl('Individual', [Validators.required]),
  });

  
  ngOnInit(): void { 
     
    this.CountryService.get({} , null, '/all').subscribe(data=>{
      this.contries = data.content.data;
    });
    this.CSMService.get({} , null, '/customers').subscribe(data=>{
      console.log(data);
    });
  }


  doSave() {
    this.pageForm.controls['personType'].setValue('Individual');
    if (!this.pageForm.valid) {
      this.toastr.error('خطا در ثبت نام', 'ورودی ها نامعتبر هستند');
    } else {
      this.blockUI.start();
      this.CustomerService.post(this.pageForm.value, null, "/customers/individual").subscribe(
        data => {
          this.blockUI.stop(); 
          let userId = data.content;
          this.router.navigate(['../Verify/'+userId], { relativeTo: this.route });
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