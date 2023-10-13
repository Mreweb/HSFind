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
    inputPhone: new FormControl(''),
    inputEmail: new FormControl(''),
    inputUserName: new FormControl(''),
    inputPassword: new FormControl(''),
    inputPasswordConfirm: new FormControl('')
  })


  doRegister(){

    /*this.blockUI.start();
    this.personService.get({}).subscribe(data=>{
      console.log(data);
      this.blockUI.stop();
    });*/


  }
  



}
