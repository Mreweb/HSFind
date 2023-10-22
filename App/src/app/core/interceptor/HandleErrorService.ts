import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { CustomerService } from "@app/services/ui/cutsomer.service";


@Injectable({
    providedIn: "root",
})
export class HandleErrorService {

    @BlockUI() blockUI: NgBlockUI;
    constructor(
        private service : CustomerService,
        private toastr: ToastrService
        ) {
    }
    // Handling HTTP Errors using Toaster
    public handleError(error: HttpErrorResponse) {
        if (error.status === 500) {
            //  redirect to error page 
            console.log("Errror From Server 500 ");
            this.service.get({}).subscribe(data=>{
                console.log(data);
            });
            this.toastr.error("خطای ارتباط با سرور");
        }
        else if (error.status === 401) {
            //  redirect to error page
            this.toastr.error("دسترسی به درخواست مقدور نمی باشد");
        }
        else if (error.status === 400) {
            //  redirect to error page
            this.toastr.error("خطایی در اطلاعات ارسال شده وجود دارد");
        }
        else {
            // display error message 
            this.toastr.error("خطای ارتباط با سرور");
        }
        this.blockUI.stop();

    }
}