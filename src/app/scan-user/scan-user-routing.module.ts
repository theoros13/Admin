import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanUserPage } from './scan-user.page';

const routes: Routes = [
  {
    path: '',
    component: ScanUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanUserPageRoutingModule {}
