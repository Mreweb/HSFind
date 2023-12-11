import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { CSMService } from '@app/services/ui/csm.service';
import { CountryService } from '@app/services/ui/country.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-profile-info',
  templateUrl: './plan-buy.component.html',
  styleUrls: ['./plan-buy.component.css']
})
export class PlanBuyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private CSMService: CSMService,
    private CountryService: CountryService,
    private toastr: ToastrService
  ) { }
  @BlockUI() blockUI: NgBlockUI;


  planId = this.route.snapshot.paramMap.get('planId') || "";

  userInfo = {};
  userCurrentPlan: any = {};
  activePlans: any = [];
  defects: any;


  ngOnInit(): void {

    this.CSMService.get({}, null, '/plans/' + this.planId).subscribe(data => {
      this.activePlans = data.content;
      console.log(this.activePlans);
    });

    this.CSMService.get({}, null, '/plans/my').subscribe(data => {
      this.userCurrentPlan = data.content.data || [];
    });



  }


  setOrder() {
    this.blockUI.start();
    this.CSMService.get({}, null, '/customers/defects').subscribe(data => {
      this.defects = data.content || [];
      if (!this.defects.hasDefects) {
        this.CSMService.post({
          "currencyType": "IRR",
          "orderItems": [{ "planId": this.planId, "discountCode": null }]
        }, null, "/orders").subscribe({
          next: (data: any) => {
            let orderId = data.content.id;
            this.CSMService.post({
              "currencyType": "IRR",
               "gateway": "ZarrinPal" 
              }, null, "/orders/" + orderId + "/start").subscribe({
              next: (data: any) => {
                this.blockUI.stop();
                let orderId = data.content.id;
                let url = data.content.redirectUrl+data.content.authority;
                location.href = url;
                this.toastr.info(data.message);
              },
              error: (error) => {
                this.blockUI.stop();
                this.toastr.info(error.error.message);
              }
            });
            this.toastr.info(data.message);
          },
          error: (error) => {
            this.blockUI.stop();
            this.toastr.info(error.error.message);
          }
        });
      } else{
        this.blockUI.stop();
        this.toastr.info("لطفا قبل از خرید طرح، اطلاعات خود را تکمیل کنید");
      }
    });



  }
}