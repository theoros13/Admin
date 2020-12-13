import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifEventPage } from './modif-event.page';

const routes: Routes = [
  {
    path: '',
    component: ModifEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifEventPageRoutingModule {}
