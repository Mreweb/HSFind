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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private ProductService: ProductService,
    private storage: BrowserStorageService,
    private toastr: ToastrService) {
  }
  captchaSrc = "";
  searchItems: any;
  pageIndex = 1;
  hasData = true;
  hasAccessFound = false;

  searchWord = this.route.snapshot.paramMap.get('search') || "";
  isTerm = this.route.snapshot.queryParamMap.get('isTerm') || "";
 

  pageForm = new FormGroup({
    include: new FormControl(this.searchWord, [Validators.required]),
    Language: new FormControl('Fa', [Validators.required]),
    page: new FormControl(this.pageIndex, [Validators.required]),
    pageSize: new FormControl('10', [Validators.required])
  });

  ngOnInit(): void {
    this.doSearch();

  }
  doSearch(isFirstTime = 1) {
    if (!this.pageForm.valid) {
      this.toastr.error('خطا در ثبت نام', 'ورودی ها نامعتبر هستند');
    }
    else {
      this.blockUI.start();
      if (isFirstTime == 1) {
        let searchData = {}; 
        if (this.isTerm == 'true') {
          searchData = {
            term: this.pageForm.controls['include'].value,
            Language: this.pageForm.controls['Language'].value,
            page: this.pageForm.controls['page'].value,
            pageSize: this.pageForm.controls['pageSize'].value,
          }
        } else{
          searchData = {
            include: this.pageForm.controls['include'].value,
            Language: this.pageForm.controls['Language'].value,
            page: this.pageForm.controls['page'].value,
            pageSize: this.pageForm.controls['pageSize'].value,
          }
        }
        this.ProductService.get(searchData, null, "/products/search").subscribe(
          data => {
            this.searchItems = data.content.data;
            this.hasData = true;
            for (let i = 0; i < this.searchItems.length; i++) {
              if (this.searchItems[i].hasAccess) {
                this.hasAccessFound = true;
              }
            }
            this.blockUI.stop();
          },
          error => {
            this.blockUI.stop();
            this.toastr.info(error.error.message);
          }
        );
      } else {
        this.pageIndex += 1;
        this.pageForm.controls['page'].setValue(this.pageIndex);
        this.ProductService.get(this.pageForm.value, null, "/products/search").subscribe(
          data => {
            for (var i = 0; i < data.content.data.length; i++) {
              this.searchItems.push(data.content.data[i]);
            }
            if (data.content.data.length == 0) {
              this.hasData = false;
            }
            this.blockUI.stop();
          },
          error => {
            this.blockUI.stop();
            this.toastr.info(error.error.message);
          }
        );
      }
    }
  }

}
