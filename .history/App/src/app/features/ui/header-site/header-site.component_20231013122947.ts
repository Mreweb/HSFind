import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserStorageService } from '@app/core/services/storage/browser-storage.service';
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
    private storate: BrowserStorageService,
    private toastr: ToastrService
  ) { }
  @BlockUI() blockUI: NgBlockUI;
  captchaSrc = "";
  userInfo = undefined;
  pageForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    captchaCode: new FormControl('', [Validators.required]),
    captchaId: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {

    this.userInfo = this.storate.getLocal('userInfo');

  }



  signOut() {
    this.blockUI.start();
    this.CustomerService.post({}, null, "/signOut").subscribe(
      data => {
        this.blockUI.stop();
        this.userInfo = undefined;
        this.storate.removeLocal("userInfo");
        this.router.navigateByUrl('');
        this.toastr.info(data.message);
      },
      error => {
        this.blockUI.stop();
        
        this.toastr.info(error.error.message);
      }
    );
  }
 

}
