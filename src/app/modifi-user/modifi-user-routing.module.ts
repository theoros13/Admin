import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifiUserPage } from './modifi-user.page';

const routes: Routes = [
  {
    path: '',
    component: ModifiUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifiUserPageRoutingModule {}
