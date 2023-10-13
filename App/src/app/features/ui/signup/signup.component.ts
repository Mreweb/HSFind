import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private toastr: ToastrService
  ) { }
  @BlockUI() blockUI: NgBlockUI;
  captchaSrc = "";

  pageForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    captchaCode: new FormControl('', [Validators.required]),
    captchaId: new FormControl('', [Validators.required]),
    personType: new FormControl('Individual', [Validators.required]),
  });

  getCaptcha(){
    this.CustomerService.get({
      captchaId : this.pageForm.controls['captchaId'].value
    }, null, "/captcha").subscribe(
      data =>{
        this.captchaSrc = "data:image/png;base64,"+data.content.captchaImage;
        this.pageForm.controls['captchaId'].setValue(data.content.captchaId);
        console.log(data);
      }
    )
  }
  ngOnInit(): void {
    
    this.getCaptcha();
    

  }
  doRegister() {
    this.pageForm.controls['personType'].setValue('Individual');
    if (!this.pageForm.valid) {
      this.toastr.error('خطا در ثبت نام', 'ورودی ها نامعتبر هستند');
    } else {
      this.blockUI.start();
      this.CustomerService.post(this.pageForm.value, null, "/customers/register").subscribe(
        data => {
          this.blockUI.stop();
          this.getCaptcha();
          let userId = data.content;
          this.router.navigate(['../Verify/'+userId], { relativeTo: this.route });
          this.toastr.info(data.message);
        },
        error => {
          this.blockUI.stop();
          this.getCaptcha();
          this.toastr.info(error.error.message);
        }
      );
    }
  }
}