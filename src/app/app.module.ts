import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { ToastrModule } from 'ngx-toastr';
import { WebcamModule } from 'ngx-webcam';
import { FormsModule } from '@angular/forms';



registerLocaleData(localePtBr);

@NgModule({
  declarations: [AppComponent, NavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularMaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    WebcamModule
    //UtilsModule
  ],
  providers: [
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
