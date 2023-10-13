import { Component } from '@angular/core'; 

import { FormGroup, FormControl, Validators } from '@angular/forms'
import { PersonService } from '@app/services/ui/peerson.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private personService : PersonService){ }

  @BlockUI() blockUI: NgBlockUI;

  pageForm = new FormGroup({
    inputFullName: new FormControl('', [Validators.required]),
    inputPhone: new FormControl('', [Validators.required  , Validators.pattern("/^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/")]),
    inputEmail: new FormControl('', [Validators.required  , Validators.pattern("/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/")] ),
    inputUserName: new FormControl('', [Validators.required]),
    inputPassword: new FormControl('', [Validators.required]),
    inputPasswordConfirm: new FormControl('', [Validators.required])
  })


  doRegister(){


    console.log(this.pageForm.value);
    /*this.blockUI.start();
    this.personService.get({}).subscribe(data=>{
      console.log(data);
      this.blockUI.stop();
    });*/


  }
  



}
