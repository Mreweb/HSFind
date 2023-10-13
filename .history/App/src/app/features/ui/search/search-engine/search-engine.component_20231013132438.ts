import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { ProductService } from '@app/services/ui/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserStorageService } from '@app/core/services/storage/browser-storage.service';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private ProductService: ProductService, 
    private storage: BrowserStorageService,
    private toastr: ToastrService){
  }
  captchaSrc = "";
  
  searchWord = this.route.snapshot.paramMap.get('search');
  pageForm = new FormGroup({
    include: new FormControl(this.searchWord, [Validators.required]),
    Language: new FormControl('Fa', [Validators.required]),
    page: new FormControl('1', [Validators.required]),
    pageSize: new FormControl('10', [Validators.required])
  });

  ngOnInit(): void {




    this.blockUI.start();
    this.ProductService.get(this.pageForm.value, null, "/products/search").subscribe(
      data => {
      },
      error => {
        this.blockUI.stop();
        this.toastr.info(error.error.message);
      }
    );

  }
  doSearch() { 
    if (!this.pageForm.valid) {
      this.toastr.error('خطا در ثبت نام', 'ورودی ها نامعتبر هستند');
    }
     else {
      this.blockUI.start();
      this.ProductService.get(this.pageForm.value, null, "/products/search").subscribe(
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
