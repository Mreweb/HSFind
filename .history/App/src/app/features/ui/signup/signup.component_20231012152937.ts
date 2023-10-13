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
    inputFullName: new FormControl('', [Validators.required]),
    inputPhone: new FormControl('', [Validators.required]),
    inputEmail: new FormControl('', [Validators.required  , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ] ),
    inputUserName: new FormControl('', [Validators.required]),
    inputPassword: new FormControl('', [Validators.required]),
    inputPasswordConfirm: new FormControl('', [Validators.required])
  })


  doRegister(){

    if(!this.pageForm.valid){
      this.toastr.error('خطا در ثبت نام', 'ورودی ها نامعتبر هستند');
    }  else{
    console.log(this.pageForm.value);
    this.blockUI.start();
    /*this.personService.get({}).subscribe(data=>{
      console.log(data);
      this.blockUI.stop();
    });*/
    }
   


  }
  



}
