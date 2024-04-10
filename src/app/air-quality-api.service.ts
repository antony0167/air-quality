import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AirQualityData} from "./models/air-quality.model";
import {GeocodingData} from "./models/geocoding.model";

@Injectable({
  providedIn: 'root'
})
export class AirQualityApiService {

  constructor(private http: HttpClient) { }

  API_key = '188eab7c2515f1282055f931a45219b2';

  Google_API_key = 'AIzaSyBmDPSJ48OeC5U36oRlbyxiq7O8hWFK9Ac';
  readPollution(lat: number, lon: number) {
    return this.http.get<AirQualityData>(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${this.API_key}`)
  }

  readCoordinates(country: string) {
    return this.http.get<GeocodingData>(`https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=${this.Google_API_key}`)
  }

}
