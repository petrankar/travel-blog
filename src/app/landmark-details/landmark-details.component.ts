import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Landmark } from '../landmarks.interface';
import { LandmarkService } from 'src/services/landmark.service';

@Component({
  selector: 'app-landmark-details',
  templateUrl: './landmark-details.component.html',
  styleUrls: ['./landmark-details.component.scss'],
})
export class LandmarkDetailsComponent implements OnInit {
  public landmark$: Observable<Landmark>;
  public landmarkId: string | null;
  public landmark = {} as Landmark;
  public landmarkMarker: google.maps.LatLngLiteral;
  public landmarkCenter: google.maps.LatLngLiteral;
  public zoom = 10;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private landmarkService: LandmarkService,
  ) {
    this.landmark$ = new Observable<Landmark>;
    this.landmarkId = null;
  }

   ngOnInit():void {

    this.landmarkId = this.route.snapshot.paramMap.get('id');

    this.landmarkService.getLandmark(this.landmarkId).subscribe( landmark => {
      this.landmark = landmark;
      this.landmarkMarker = {lat: <number>landmark.location[1], lng: <number> landmark.location[0]};
      this.landmarkCenter = this.landmarkMarker;
    })
  }

  markerOptions: google.maps.MarkerOptions = {
      draggable: false
  };

  navigateBack() {
    this.router.navigate(["/dashboard"]);
  }
}
