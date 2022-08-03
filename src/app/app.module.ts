import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LandmarkDetailsComponent } from './landmark-details/landmark-details.component';
import { LandmarkListComponent } from './landmark-list/landmark-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AdministratorComponent } from './administrator/administrator.component';
@NgModule({
  declarations: [
    routingComponents,
    LandmarkListComponent,
    LandmarkDetailsComponent,
    LoginComponent,
    AdministratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
