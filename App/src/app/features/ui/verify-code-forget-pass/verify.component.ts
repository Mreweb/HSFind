import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-verify-code-password',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyForgetPasswordComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private toastr: ToastrService
  ) { }
  @BlockUI() blockUI: NgBlockUI;

  captchaSrc = "";
  timerHtml: any = "";
  timer: any = 60;
  canSendAgain: any = false;
  userId = this.route.snapshot.paramMap.get('userId');
  pageForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
    userId: new FormControl(this.userId, [Validators.required]),
    newpassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    captchaCode: new FormControl('', [Validators.required]),
    captchaId: new FormControl('', [Validators.required])
  })

  getCaptcha() {
    this.CustomerService.get({
      captchaId: this.pageForm.controls['captchaId'].value
    }, null, "/captcha").subscribe(
      data => {
        this.captchaSrc = "data:image/png;base64," + data.content.captchaImage;
        this.pageForm.controls['captchaId'].setValue(data.content.captchaId);
        console.log(data);
      }
    )
  }

  ngOnInit(): void { 
    this.counter();
    this.getCaptcha();
  }


  doRegister() {
    if (!this.pageForm.valid) {
      this.toastr.error('خطا در ثبت نام', 'ورودی ها نامعتبر هستند');
    } else {
      this.blockUI.start();
      this.CustomerService.post(this.pageForm.value, null, '/password/reset/' + this.userId).subscribe(
        data => {
          this.blockUI.stop();
          this.getCaptcha();
          this.router.navigate(['../Login'], { relativeTo: this.route });
          this.toastr.success(data.message);
        },
        error => {
          this.blockUI.stop();
          this.getCaptcha();
          this.toastr.info(error.error.message);
        }
      );
    }
  }

  counter() {
    this.timer = 60;
    let time = setInterval(() => {
      this.timerHtml = this.timer + " ثانیه ";
      this.timer -= 1;
      if (this.timer == -1) {
        this.canSendAgain = true;
        clearInterval(time);
      }
    }, 1000);
  }
  resend() {
    this.blockUI.start();
    this.CustomerService.post(this.pageForm.value, null, '/customers/' + this.userId + "/activation/resend").subscribe(
      data => {
        this.counter();
        this.canSendAgain = false;
        this.blockUI.stop();
        this.getCaptcha();
        this.toastr.success(data.message);
      },
      error => {
        this.canSendAgain = true;
        this.blockUI.stop();
        this.getCaptcha();
        this.toastr.info(error.error.message);
      }
    );
  }
}