import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AirQualityData} from "./models/air-quality.model";
import {GeocodingData} from "./models/geocoding.model";

@Injectable({
  providedIn: 'root'
})
export class AirQualityApiService {

  constructor(private http: HttpClient) { }

  Google_API_key = 'AIzaSyAI-hfciLoy9ZCktxnRWeyuSPSb5S5waPw';
  readPollution(lat: number, lon: number) {
    return this.http.post<AirQualityData>(`https://airquality.googleapis.com/v1/currentConditions:lookup?key=${this.Google_API_key}`,
      {
        "location": {
          "latitude": lat,
          "longitude": lon
        }
      })
  }

  readCoordinates(country: string) {
    return this.http.get<GeocodingData>(`https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=${this.Google_API_key}`)
  }

}
