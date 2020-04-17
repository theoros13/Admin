import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtracPageRoutingModule } from './extrac-routing.module';

import { ExtracPage } from './extrac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtracPageRoutingModule
  ],
  declarations: [ExtracPage]
})
export class ExtracPageModule {}
