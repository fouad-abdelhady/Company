import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'profile', loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfileModule)},
  {path:'admin-profile', loadChildren:()=>import('./admin-profile/admin-profile.module').then(m=>m.AdminProfileModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
