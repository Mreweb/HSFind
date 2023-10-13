import { CanActivateFn } from '@angular/router';
import { CustomerService } from '@app/services/ui/cutsomer.service';

export const authGuard: CanActivateFn = (route, state) => {

  if(localStorage.getItem("clientId")){
    return true;
  } else{
    return false;
  }
};
