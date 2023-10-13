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
export class ProductCodeDetailComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  product: any;
  captchaSrc = "";
  searchItems: any;
  pageIndex = 1;
  hasData = true;
  htsCode = this.route.snapshot.paramMap.get('htsCode') || "";
  countryCode = this.route.snapshot.paramMap.get('countryCode') || "";
  countryId: any = this.countryCode;
  contries: any[] = [];
  productList: any[] = [];
  productTree: any;

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


  loadData() {
    this.getTypeIdContries();
    this.getProductByHTS();
    this.geProductTreeByHTS();
  }

  getTypeIdContries() {
    this.ProductService.get({}, null, "/products/hts-countries?code=" + this.htsCode + "&revision=" + 5).subscribe(
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

  getProductByHTS() {
    this.ProductService.get({}, null, "/products/by-hts/" + this.htsCode + "/?country=" + this.countryId + "&revision=" + 5).subscribe(
      data => {
        this.product = data.content;
      },
      error => {
        this.toastr.info(error.error.message);
      }
    );
  }


  geProductTreeByHTS() {
    this.ProductService.get({}, null, "/products/tree/" + this.htsCode + "?revision=5").subscribe(
      data => {
        this.productTree = data.content;
        let items = [];
        items.push(this.productTree.title);

        let hasTreeitem = true;
        let TreeItem: any;
        while (hasTreeitem) {
          debugger
          if (this.productTree['items'][0] !== null) {
            this.productTree['items'] = this.productTree['items'][0];
            TreeItem = this.productTree['items'];
            items.push(TreeItem['title']);
          } else{
            hasTreeitem=false;
          }
        }
        console.log("items", items);
      },
      error => {
        this.toastr.info(error.error.message);
      }
    );
  }

}
