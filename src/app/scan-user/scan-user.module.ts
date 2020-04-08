import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanUserPageRoutingModule } from './scan-user-routing.module';

import { ScanUserPage } from './scan-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanUserPageRoutingModule
  ],
  declarations: [ScanUserPage]
})
export class ScanUserPageModule {}
