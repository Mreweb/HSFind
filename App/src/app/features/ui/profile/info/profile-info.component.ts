import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { CSMService } from '@app/services/ui/csm.service';
import { CountryService } from '@app/services/ui/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersianCalendarService } from '@app/core/services/calendar/persian.calendar.service';
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
    private PersianCalendarService: PersianCalendarService,

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
    birthDate: new FormControl(new Date(), [Validators.required]),
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

      let birthDate = data.birthDate;
      birthDate = this.PersianCalendarService.PersianCalendar(birthDate);
      this.pageForm.controls["birthDate"].setValue(birthDate);
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
 
    let birthDateGeo: any = this.PersianCalendarService.GeorgianCalendar(this.pageForm.controls['birthDate'].value);
 

    if (!this.pageForm.valid) {
      this.toastr.error('خطا در ثبت نام', 'ورودی ها نامعتبر هستند');
    } else {
      this.blockUI.start();
      this.CSMService.put(
        {
          "firstName":  this.pageForm.controls["firstName"].value,
          "lastName": this.pageForm.controls["lastName"].value,
          "phoneNumber": this.pageForm.controls["phoneNumber"].value,
          "gender": this.pageForm.controls["gender"].value,
          "birthDate": new Date(birthDateGeo),
          "email": this.pageForm.controls["email"].value,
          "countryCode": this.pageForm.controls["countryCode"].value,
          "country": this.pageForm.controls["country"].value,
          "city": this.pageForm.controls["city"].value,
          "address": this.pageForm.controls["address"].value,
          "postalCode": this.pageForm.controls["postalCode"].value,
          "personType": "Individual"
        }

        , null, "/customers/individual").subscribe(
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