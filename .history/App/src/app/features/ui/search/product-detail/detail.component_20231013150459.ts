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

  countryId: number;
  contries: any[] = [];

  pageForm = new FormGroup({
    /*include: new FormControl(this.searchWord, [Validators.required]),
    Language: new FormControl('Fa', [Validators.required]),
    page: new FormControl(this.pageIndex, [Validators.required]),
    pageSize: new FormControl('10', [Validators.required])*/
  });

  ngOnInit(): void {
    this.getTypeIdContries();

  }
  getTypeIdContries(isFirstTime = 1) {
    this.ProductService.get({}, null, "/products/typeId-countries?typeId=" + this.typeId).subscribe(
      data => {
        this.searchItems = data.content.data;
        for (let i = 0; i < data.content.data.length; i++) {
          this.contries.push({
            id: data.content.data[i].id,
            code: data.content.data[i].code, 
            iso: data.content.data[i].iso2, 
            officialName: data.content.data[i].officialName
          });
        }  
      },
      error => {
        this.toastr.info(error.error.message);
      }
    );
  }

}
