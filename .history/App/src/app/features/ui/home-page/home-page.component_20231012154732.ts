import { Component, OnInit } from '@angular/core';
import { PersonService } from '@app/services/ui/auth.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  constructor (private personService : PersonService){
  }

  ngOnInit(): void {
    

    /*this.blockUI.start();
    this.personService.get({}).subscribe(data=>{
      console.log(data);
      this.blockUI.stop();
    });*/


  }

}
