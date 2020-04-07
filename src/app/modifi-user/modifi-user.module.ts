import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifiUserPageRoutingModule } from './modifi-user-routing.module';

import { ModifiUserPage } from './modifi-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifiUserPageRoutingModule
  ],
  declarations: [ModifiUserPage]
})
export class ModifiUserPageModule {}
