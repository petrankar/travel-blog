import { Component, OnInit } from '@angular/core';
import { LandmarkService } from 'src/services/landmark.service';
import { Landmark } from '../landmarks.interface';
@Component({
  selector: 'app-landmark-list',
  templateUrl: './landmark-list.component.html',
  styleUrls: ['./landmark-list.component.scss'],
})
export class LandmarkListComponent implements OnInit {
  landmarkList: Landmark[];
  constructor(private landmarkService: LandmarkService) {
    this.landmarkList = [];
  }

  ngOnInit() {
    this.landmarkService.getLandmarks().subscribe((landmarkList) => {
      console.log(landmarkList);
      this.landmarkList = landmarkList;
    });

    // this.authService
    //   .login({ username: 'admin', password: 'admin' })
    //   .subscribe((userDetails) => {
    //     console.log(userDetails);

    //     setTimeout(() => {
    //       this.authService.logout(userDetails.sessionToken).subscribe((res) => {
    //         console.log('logout response: ', res);
    //       });
    //     }, 5000);
    //   });
  }
}
