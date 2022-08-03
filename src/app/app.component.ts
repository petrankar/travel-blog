import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { LandmarkService } from 'src/services/landmark.service';
import { Landmark } from './landmarks.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  landmarkList: Landmark[];
  protected isLoggedIn = false;
  constructor(
    private authService: AuthenticationService,
    private landmarkService: LandmarkService
  ) {
    this.landmarkList = [];
  }

  title = 'travel-blog';

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.authService.logout();
  }
}
