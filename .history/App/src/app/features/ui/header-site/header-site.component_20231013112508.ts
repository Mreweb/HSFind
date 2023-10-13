import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-header-site',
  templateUrl: './header-site.component.html',
  styleUrls: ['./header-site.component.css']
})
export class HeaderSiteComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private toastr: ToastrService
  ) { }
  @BlockUI() blockUI: NgBlockUI;
  captchaSrc = "";

  pageForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    captchaCode: new FormControl('', [Validators.required]),
    captchaId: new FormControl('', [Validators.required])
  });
 
  ngOnInit(): void {
 

    /*this.CustomerService.get({}, null, "/check/user").subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(this.router.url);
        this.router.navigateByUrl('Login');
      }
    );*/

  }
   

}
