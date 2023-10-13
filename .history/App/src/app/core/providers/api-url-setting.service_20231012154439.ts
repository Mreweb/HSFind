import { Injectable, Inject } from '@angular/core';
import { IapiUrlSetting } from '../interfaces/iapi-url-setting';
import { APP_CONFIG, AppConfig, APP_DI_CONFIG } from '../config/app.config';


@Injectable()
export class ApiUrlSetting implements IapiUrlSetting {

    queryApiUrl: string;

    constructor(@Inject(APP_CONFIG) config: AppConfig) {
        this.queryApiUrl = "";
    }


   
  getQueryApiUrl(controller: string, apiOption: string = '' ,customQueryApi: string = ''): string {
      if (customQueryApi !== '')
        this.queryApiUrl = customQueryApi
      else {
        switch (apiOption) {
          case 'front': 
            this.queryApiUrl = APP_DI_CONFIG.ApiEndPoint;
            break;
            case 'cache':
              this.queryApiUrl = APP_DI_CONFIG.CacheServer;
              break; 
          case 'fileManager':
            this.queryApiUrl = APP_DI_CONFIG.FileManagerEndPoint;
            break;
          default:
            this.queryApiUrl = "";
            break;
        }
      }
      return this.queryApiUrl + '/' + controller;
    }

}
