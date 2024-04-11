import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from "rxjs";
import {AirQualityApiService} from "../air-quality-api.service";
import {FormsModule} from "@angular/forms";
import {AirQualityData} from "../models/air-quality.model";
import {GeocodingData} from "../models/geocoding.model";

@Component({
  selector: 'app-air-quality',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './air-quality.component.html',
  styleUrls: ['./air-quality.component.css']
})
export class AirQualityComponent {
  constructor(private airQualityApiService: AirQualityApiService) {
  }

  countryName: string = '';
  airQualityData: AirQualityData | undefined;

  airQualityError = "";
  geolocationError = "";

  quality = new Map<number, string>([
    [1, "Good"],
    [2, "Fair"],
    [3, "Moderate"],
    [4, "Poor"],
    [5, "Very Poor"]
  ]);

  getAirQuality(countryName: string) {
    let geocodingObs: Observable<GeocodingData>;

    geocodingObs = this.airQualityApiService.readCoordinates(countryName);

    geocodingObs.subscribe({
      next: data => {

        this.geolocationError = "";
        this.airQualityError = "";

        if (data.status == "ZERO_RESULTS") {
          this.geolocationError = "There is no place on earth with this name. Please provide correct name.";
          return;
        } else if (data.status != "OK") {
          this.geolocationError = "Something went wrong. Please try again."
        }
        const lat = data.results[0].geometry.location.lat;
        const lon = data.results[0].geometry.location.lng;

        this.airQualityApiService.readPollution(lat, lon).subscribe({
          next: pollutionData => {
            this.airQualityData = pollutionData;
            this.countryName = countryName;
          },
          error: err => {
            if (err.status == 400) {
              this.geolocationError = err.error.error.message;
            } else {
              this.geolocationError = "Something went wrong";
            }
          },
        });
      },
      error: err => {
        this.airQualityError = err;
      },
    });
  }

  protected readonly Math = Math;
}
