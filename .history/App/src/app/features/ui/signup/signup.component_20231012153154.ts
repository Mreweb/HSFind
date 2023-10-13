import { Component } from '@angular/core'; 

import { FormGroup, FormControl, Validators } from '@angular/forms'
import { PersonService } from '@app/services/ui/peerson.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private personService : PersonService,
    private toastr: ToastrService
    ){ }

  @BlockUI() blockUI: NgBlockUI;

  hasSubmitForm = false;

  pageForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required  , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ] ),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    personType: new FormControl('Individual', [Validators.required]),
  })


  doRegister(){

    if(!this.pageForm.valid){
      this.toastr.error('خطا در ثبت نام', 'ورودی ها نامعتبر هستند');
    }  else{
    console.log(this.pageForm.value);
    this.blockUI.start();
    this.personService.get({}).subscribe(data=>{
      this.blockUI.stop();
    });
    }
   


  }
  



}
