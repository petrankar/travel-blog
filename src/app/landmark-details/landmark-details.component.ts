import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private landmarkService: LandmarkService,
    private httpClient: HttpClient
    
   
  ) {
    this.landmark$ = new Observable<Landmark>;
    this.landmarkId = null;
  }

   ngOnInit():void {

    this.landmarkId = this.route.snapshot.paramMap.get('id');

    this.landmarkService.getLandmark(this.landmarkId).subscribe( landmark => {
      this.landmark = landmark;
      this.landmarkMarker = {lat: <number>landmark.location[1], lng: <number> landmark.location[0]};
    })
  }

  center: google.maps.LatLngLiteral = {
    lat: 25.276987,
    lng: 55.296249
  };

  zoom = 10;
  markerOptions: google.maps.MarkerOptions = {
      draggable: false
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  addMarker(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }
}
