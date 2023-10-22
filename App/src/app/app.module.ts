import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatureModule } from './features/feature.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { HttpInterceptorService } from './core/interceptor/interceptor';

@NgModule({ 
  declarations: [
    AppComponent
  ],
  exports: [
  ],
  imports: [ 
    CoreModule.forRoot(),
    FeatureModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),  
    HttpClientModule,
    BrowserModule,
    BlockUIModule.forRoot({
      message: '...لطفا منتظر بمانید',
      delayStart: 0,
      delayStop: 0
    }),
    AppRoutingModule
  ],  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
