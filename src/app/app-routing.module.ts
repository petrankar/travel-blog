import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandmarkDetailsComponent } from './landmark-details/landmark-details.component';
import { LandmarkListComponent } from './landmark-list/landmark-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AdministratorComponent } from './administrator/administrator.component';
const appRoutes: Routes = [
  { path: 'dashboard', component: LandmarkListComponent },
  {
    path: 'landmark/:id',
    component: LandmarkDetailsComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'administrator',
    component: AdministratorComponent,
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
export const routingComponents = [
  AppComponent,
  LandmarkListComponent,
  LandmarkDetailsComponent,
];
