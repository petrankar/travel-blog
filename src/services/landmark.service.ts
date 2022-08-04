import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Landmark } from 'src/app/landmarks.interface';
@Injectable({
  providedIn: 'root',
})
export class LandmarkService {
  private readonly baseEndpoint = 'https://frontend-2376.instashop.ae/api/';
  private readonly landmarksPath = 'landmarks/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getLandmarks(): Observable<Landmark[]> {
    const url = this.baseEndpoint + this.landmarksPath;
    return this.http.get<Landmark[]>(url, this.httpOptions);
    // .map((response: Response) => <Landmark[]>response.json());
  }

  getLandmark(id: string | null) {
    const url = this.baseEndpoint + this.landmarksPath + id;
    return this.http.get<Landmark>(url);
  }

  updateLandmark(id: string, landmark: any): Observable<any> {
    const sessionToken = sessionStorage.getItem('sessionToken');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-sessiontoken': <string>sessionToken,
      }),
    };

    const url = this.baseEndpoint + this.landmarksPath + id;
    return this.http.put(url, { ...landmark, location: [11, 22] }, options);
  }
}
