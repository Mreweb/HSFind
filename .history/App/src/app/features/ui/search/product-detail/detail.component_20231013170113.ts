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
  product: any;
  captchaSrc = "";
  searchItems: any;
  pageIndex = 1;
  hasData = true;
  typeId = this.route.snapshot.paramMap.get('typeId') || "";
  countryId: any = "";
  contries: any[] = [];
  productList: any[] = [];
  pageForm = new FormGroup({
    /*include: new FormControl(this.searchWord, [Validators.required]),
    Language: new FormControl('Fa', [Validators.required]),
    page: new FormControl(this.pageIndex, [Validators.required]),
    pageSize: new FormControl('10', [Validators.required])*/
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private ProductService: ProductService,
    private storage: BrowserStorageService,
    private toastr: ToastrService) {
  }


  ngOnInit(): void {
    
    this.loadData();

  }


  loadData(){
    this.getTypeIdContries();
    this.getProductByTypeId();
    this.geProducts();
  }

  getTypeIdContries() {
    this.ProductService.get({}, null, "/products/typeId-countries?typeId=" + this.typeId+"&country="+this.countryId).subscribe(
      data => { 
        this.contries.push({
          id: "",
          code: "", 
          iso: "", 
          officialName: "کشور مقصد را انتخاب کنید"
        });
        for (let i = 0; i < data.content.length; i++) {
          this.contries.push({
            id: data.content[i].id,
            code: data.content[i].code,  
            iso: data.content[i].iso2, 
            officialName: data.content[i].officialName
          });
        }  
      },
      error => {
        this.toastr.info(error.error.message);
      }
    );
  }

  getProductByTypeId() {
    this.ProductService.get({}, null, "/products/by-typeId?typeId=" + this.typeId+"&country="+this.countryId).subscribe(
      data => { 
        this.product = data.content;
      },
      error => {
        this.toastr.info(error.error.message);
      }
    );
  }


  geProducts() {
    this.ProductService.get({}, null, "/products/find-hts?typeId=" + this.typeId+"&country="+this.countryId).subscribe(
      data => { 
        this.productList = data.content;
      },
      error => {
        this.toastr.info(error.error.message);
      }
    );
  }

}
