import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModifiUserPageModule } from './modifi-user/modifi-user.module';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'modifi-user',
    loadChildren: () => import('./modifi-user/modifi-user.module').then( m => m.ModifiUserPageModule)
  },
  {
    path: 'view-user',
    loadChildren: () => import('./view-user/view-user.module').then( m => m.ViewUserPageModule)
  },
  {
    path: 'scan-user',
    loadChildren: () => import('./scan-user/scan-user.module').then( m => m.ScanUserPageModule)
  },
  {
    path: 'extrac',
    loadChildren: () => import('./extrac/extrac.module').then( m => m.ExtracPageModule)
  },  {
    path: 'event',
    loadChildren: () => import('./event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'view-event',
    loadChildren: () => import('./view-event/view-event.module').then( m => m.ViewEventPageModule)
  },
  {
    path: 'add-event',
    loadChildren: () => import('./add-event/add-event.module').then( m => m.AddEventPageModule)
  },
  {
    path: 'modif-event',
    loadChildren: () => import('./modif-event/modif-event.module').then( m => m.ModifEventPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  entryComponents : [
    
  ]
})
export class AppRoutingModule { }
