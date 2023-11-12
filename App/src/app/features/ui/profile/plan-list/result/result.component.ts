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
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class PlanBuyResultComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private CSMService: CSMService,
    private CountryService: CountryService,
    private toastr: ToastrService
  ) { }
  @BlockUI() blockUI: NgBlockUI;

  Authority = this.route.snapshot.queryParamMap.get('Authority') || "";
  Status = this.route.snapshot.queryParamMap.get('Status') || "";





  isSuccess: boolean;
  isVerified: boolean = false;

  ngOnInit(): void {


    if (this.Status == 'NOK') {
      this.isSuccess = false;
    } else {
      this.blockUI.start();
      this.CSMService.post({
        "gateway": "ZarrinPal",
        "authority": this.Authority
      }, null, "/orders/verify").subscribe({
        next: (data: any) => {
          this.isVerified = true; 
          this.blockUI.stop();
          if(data.content.success){ 
            this.isSuccess = true;  
          } else{
            this.isSuccess = false; 
          }
          this.toastr.info(data.message);
        },
        error: (error) => {
          this.blockUI.stop();
          this.toastr.info(error.error.message);
        }
      });
    }

  }


}