import { Component, OnInit } from '@angular/core';
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
    include: new FormControl('', [Validators.required]),
    Language: new FormControl('Fa', [Validators.required]),
    page: new FormControl('1', [Validators.required]),
    pageSize: new FormControl('10', [Validators.required])
  });


  ngOnInit(): void {
    //products/search
  }
  doSearch() { 
    if (!this.pageForm.valid) {
      this.toastr.error('خطا در ثبت نام', 'ورودی ها نامعتبر هستند');
    }
     else {
      this.blockUI.start();
      this.CustomerService.post(this.pageForm.value, null, "/products/search").subscribe(
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
