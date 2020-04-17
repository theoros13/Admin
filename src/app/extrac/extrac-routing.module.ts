import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtracPage } from './extrac.page';

const routes: Routes = [
  {
    path: '',
    component: ExtracPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtracPageRoutingModule {}
