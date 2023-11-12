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
export class ProductRequirmentDetailComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  product: any;
  captchaSrc = "";
  searchItems: any;
  pageIndex = 1;
  hasData = true;
  htsCode = this.route.snapshot.paramMap.get('htsCode') || "";
  countryCode = this.route.snapshot.paramMap.get('countryCode') || "";
  selectCountryIndex = 0;
  countryId: any = "";
  contries: any[] = [];
  productList: any[] = [];

  destinationCoutryCode = null;
  pageForm = new FormGroup({
    /*include: new FormControl(this.searchWord, [Validators.required]),
    Language: new FormControl('Fa', [Validators.required]),
    page: new FormControl(this.pageIndex, [Validators.required]),
    pageSize: new FormControl('10', [Validators.required])*/
  });
  sourceCountryName: any;
  rules: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private ProductService: ProductService,
    private storage: BrowserStorageService,
    private toastr: ToastrService) {
  }


  ngOnInit(): void {
    
    this.toastr.show('لطفا کشور مقصد را انتخاب کنید');
    this.loadData();

  }


  loadData(){
    this.getTypeIdContries();
    this.getProductByHTS(); 
  }

  getTypeIdContries() {

    if (this.countryCode != null) {
      this.ProductService.get({}, null, "/requirements/partners/" +"?importer=" + this.countryCode +  "&product=" + this.htsCode).subscribe(
        data => {
          for (let i = 0; i < data.content.length; i++) {
            this.contries.push({
              id: data.content[i].id,
              code: data.content[i].code,
              iso: data.content[i].iso2,
              officialName: data.content[i].officialName
            });
            if (data.content[i].code == this.countryCode) {
              this.selectCountryIndex = i;
              this.countryCode = this.contries[this.selectCountryIndex].code;
              this.sourceCountryName = this.contries[this.selectCountryIndex].officialName;
            }
          }

        },
        error => {
          this.toastr.info(error.error.message);
        }
      );
    }
  }

  getProductByHTS() {
    if (this.countryCode != null) {
      this.ProductService.get({}, null, "/products/by-hts/" + this.htsCode + "/?country=" + this.countryCode + "&revision=" + 5).subscribe(
        data => {
          this.product = data.content;
        },
        error => {
          this.toastr.info(error.error.message);
        }
      );
    }
  }

  
  getRules() {
    if (this.countryCode != null && this.destinationCoutryCode != null) {
      this.ProductService.get({}, null, "/requirements/" +"?importer=" + this.countryCode + "&exporter=" + this.destinationCoutryCode + "&product=" + this.htsCode).subscribe(
        data => {
          this.rules = data.content;
        },
        error => {
          this.toastr.info(error.error.message);
        }
      );
    }
  }


 


}
