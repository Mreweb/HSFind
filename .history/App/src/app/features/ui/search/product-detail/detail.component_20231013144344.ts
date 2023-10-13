import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { ProductService } from '@app/services/ui/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserStorageService } from '@app/core/services/storage/browser-storage.service';

@Component({
  selector: 'app-search-product-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class ProductDetailComponent implements OnInit {
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

  typeId = this.route.snapshot.paramMap.get('typeId') || "";

  pageForm = new FormGroup({
    /*include: new FormControl(this.searchWord, [Validators.required]),
    Language: new FormControl('Fa', [Validators.required]),
    page: new FormControl(this.pageIndex, [Validators.required]),
    pageSize: new FormControl('10', [Validators.required])*/
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
      this.ProductService.get({}, null, "/products/typeId-countries?typeId=" + this.typeId).subscribe(
        data => {
          this.searchItems = data.content.data;
          this.hasData = true;
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
