import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    public authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private landmarkService: LandmarkService
  ) {}

  ngOnInit(): void {
    this.landmarkForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        url: ['', [Validators.required]],
        short_info: ['', Validators.required],
        description: ['', Validators.required],
        // password: [
        //   '',
        //   [
        //     Validators.minLength(6),
        //     this.isAddMode ? Validators.required : Validators.nullValidator,
        //   ],
        // ],
        // confirmPassword: [
        //   '',
        //   this.isAddMode ? Validators.required : Validators.nullValidator,
        // ],
      }
      // {
      //   validator: MustMatch('password', 'confirmPassword'),
      // }
    );

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.landmarkService.getLandmarks().subscribe((landmarkList) => {
      console.log(landmarkList);
      this.landmarkList = landmarkList;
    });
  }

  onSubmit() {}

  onSelectionChange() {
    this.updateResponseMessage = '';
    let landmark: Landmark;

    console.log('on selection change');
    this.isLandmarkFetching = true;
    this.landmarkService.getLandmark(this.selectedLandmarkId).subscribe({
      next: (landmarkFetched: Landmark) => {
        console.log('landmark: ', landmarkFetched);
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
      },
    });
  }

  onUpdateLandmark() {
    console.log('onUpdateLandmark');
    console.log(this.landmarkForm.value);
    this.landmarkService
      .updateLandmark(this.selectedLandmarkId, this.landmarkForm.value)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.updateResponseMessage = response?.message;
        },
        error: (e: Error) => {
          console.error(e);
          this.updateResponseMessage = e?.message;
        },
        complete: () => {
          console.log('complete');
          this.selectedLandmarkId = '';
        },
      });
  }
}