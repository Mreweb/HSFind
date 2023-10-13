import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserStorageService } from '@app/core/services/storage/browser-storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private storage: BrowserStorageService,
    private toastr: ToastrService){
  }
   
  captchaSrc = "";

  pageForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    captchaCode: new FormControl('', [Validators.required]),
    captchaId: new FormControl('', [Validators.required])
  });


  ngOnInit(): void {
    //products/search
  }
  doRegister() { 
    if (!this.pageForm.valid) {
      this.toastr.error('خطا در ثبت نام', 'ورودی ها نامعتبر هستند');
    } else {
      this.blockUI.start();
      this.CustomerService.post(this.pageForm.value, null, "/signin/password").subscribe(
        data => {
          
        },
        error => {
          this.blockUI.stop();
          this.toastr.info(error.error.message);
        }
      );
    }
  }

}
