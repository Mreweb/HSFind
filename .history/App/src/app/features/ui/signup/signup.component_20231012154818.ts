import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '@app/services/ui/auth.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private personService: AuthService,
    private toastr: ToastrService
  ) { }

  @BlockUI() blockUI: NgBlockUI;

  hasSubmitForm = false;

  pageForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    personType: new FormControl('Individual', [Validators.required]),
  })


  doRegister() {

    this.pageForm.controls['personType'].setValue('Individual');


    if (!this.pageForm.valid) {
      this.toastr.error('خطا در ثبت نام', 'ورودی ها نامعتبر هستند');
    } else {
      this.blockUI.start();
      this.personService.get(this.pageForm.value).subscribe(data => {
        console.log(data);
        this.blockUI.stop();
      });
    }



  }




}
