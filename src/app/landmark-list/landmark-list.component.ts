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
      this.landmarkList = landmarkList;
    });
  }
}
