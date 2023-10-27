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

  countryId: any = 246;
  countries: any = [];
  gender: any = 'NotSpecified';
  genderList: any = [];

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
    personType: new FormControl('Individual', [Validators.required])
  });


  ngOnInit(): void {

    this.genderList = [
      {
        type: "NotSpecified",
        name: "نامشخص"
      },
      {
        type: "Male",
        name: "مرد"
      },
      {
        type: "Female",
        name: "زن"
      },
    ];


    this.CountryService.get({}, null, '/all').subscribe(data => {
      this.countries.push({
        id: "",
        code: "",
        iso: "",
        officialName: "کشور مقصد را انتخاب کنید"
      });
      for (let i = 0; i < data.content.length; i++) {
        this.countries.push({
          code: data.content[i].isoCode,
          iso: data.content[i].iso2,
          officialName: data.content[i].officialName
        });
      }
    });


    this.CSMService.get({}, null, '/customers').subscribe(data => {
      data = data.content;
      this.pageForm.controls["firstName"].setValue(data.firstName);
      this.pageForm.controls["lastName"].setValue(data.lastName);
      this.pageForm.controls["phoneNumber"].setValue(data.contactInfo.phoneNumber);
      this.gender = data.gender;
      this.pageForm.controls["birthDate"].setValue('2021-09-10T16:44:02.7274636+03:30');
      this.pageForm.controls["email"].setValue(data.contactInfo.email);
      this.pageForm.controls["country"].setValue(data.contactInfo.country);
      this.countryId = data.contactInfo.countryCode;
      this.pageForm.controls["city"].setValue(data.contactInfo.city);
      this.pageForm.controls["address"].setValue(data.contactInfo.address);
      this.pageForm.controls["postalCode"].setValue(data.contactInfo.postalCode);
    });


  }


  doSave() {
    this.pageForm.controls['personType'].setValue('Individual');
    this.pageForm.controls['countryCode'].setValue(this.countryId);
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].code == this.countryId) {
        this.pageForm.controls['country'].setValue(this.countries[i].officialName);
      }
    }
    this.pageForm.controls['gender'].setValue(this.gender);
    

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