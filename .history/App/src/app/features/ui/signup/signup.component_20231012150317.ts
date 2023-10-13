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
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl(''),
    email: new FormControl(''),
    address: new FormGroup({
      address: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
    })
  })


  doRegister(){

    /*this.blockUI.start();
    this.personService.get({}).subscribe(data=>{
      console.log(data);
      this.blockUI.stop();
    });*/


  }
  



}
