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

  getAirQuality() {
    let geocodingObs: Observable<GeocodingData>;

    geocodingObs = this.airQualityApiService.readCoordinates(this.countryName);

    geocodingObs.subscribe({
      next: data => {
        const lat = data.results[0].geometry.location.lat;
        const lon = data.results[0].geometry.location.lng;

        this.airQualityApiService.readPollution(lat, lon).subscribe({
          next: pollutionData => {
            this.airQualityData = pollutionData;
          },
          error: err => console.error(err)
        });
      },
      error: err => console.error(err)
    });
  }
}
