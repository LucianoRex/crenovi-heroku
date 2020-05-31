import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { ToastrModule } from 'ngx-toastr';
import { WebcamModule } from 'ngx-webcam';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './login/login/login.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

export let options: Partial<IConfig> | (() => Partial<IConfig>);
registerLocaleData(localePtBr);

@NgModule({
  declarations: [AppComponent, NavComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    //AngularMaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),   
    FormsModule,
    WebcamModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    AngularMaterialModule
    //UtilsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
   { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
