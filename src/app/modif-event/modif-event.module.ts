import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifEventPageRoutingModule } from './modif-event-routing.module';

import { ModifEventPage } from './modif-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifEventPageRoutingModule
  ],
  declarations: [ModifEventPage]
})
export class ModifEventPageModule {}
