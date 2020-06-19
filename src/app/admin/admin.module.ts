import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AdminComponent } from './components/admin/admin.component';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { MatTableModule } from '@angular/material/table';
import { UserComponent } from './components/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, UserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    LayoutModule,   
  ],
})
export class AdminModule {}
