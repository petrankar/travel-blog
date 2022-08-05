import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LandmarkService } from 'src/services/landmark.service';
import { Landmark } from '../landmarks.interface';
@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {
  public isLoggedIn = false;
  public isUpdateDisabled = true;
  public selectedLandmarkId = '';
  public landmarkForm: FormGroup;
  public landmarkList: Landmark[];
  public isLandmarkFetching = false;
  public updateResponseMessage = '';
  public lastUpdatedLandmark: {
    id: string;
    title: string;
  };

  constructor(
    public authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private landmarkService: LandmarkService
  ) {}

  ngOnInit(): void {
    this.landmarkForm = this.formBuilder.group({
      title: ['', Validators.required],
      url: ['', [Validators.required]],
      short_info: ['', Validators.required],
      description: ['', Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.landmarkService.getLandmarks().subscribe((landmarkList) => {
      this.landmarkList = landmarkList;
    });
  }

  onSubmit() {}

  onSelectionChange() {
    this.updateResponseMessage = '';
    this.lastUpdatedLandmark = { id: '', title: '' };

    let landmark: Landmark;

    this.isLandmarkFetching = true;
    this.landmarkService.getLandmark(this.selectedLandmarkId).subscribe({
      next: (landmarkFetched: Landmark) => {
        landmark = landmarkFetched;
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        this.isLandmarkFetching = false;
        this.landmarkForm.controls['title'].setValue(landmark?.title);
        this.landmarkForm.controls['url'].setValue(landmark?.url);
        this.landmarkForm.controls['short_info'].setValue(landmark?.short_info);
        this.landmarkForm.controls['description'].setValue(
          landmark?.description
        );
        this.landmarkForm.controls['latitude'].setValue(landmark?.location[1]);
        this.landmarkForm.controls['longitude'].setValue(landmark?.location[0]);
      },
    });
  }

  onUpdateLandmark() {
    this.landmarkService
      .updateLandmark(this.selectedLandmarkId, this.landmarkForm.value)
      .subscribe({
        next: (response: any) => {
          this.updateResponseMessage = response?.message;
        },
        error: (e: any) => {
          console.error(e);
          this.updateResponseMessage = e.error?.message;
        },
        complete: () => {
          this.lastUpdatedLandmark = {
            id: this.selectedLandmarkId,
            title: this.landmarkTitle.value,
          };
          this.selectedLandmarkId = '';
        },
      });
  }

  get landmarkTitle() {
    return this.landmarkForm.get('title') as FormControl;
  }
}
