import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AirQualityComponent} from "./air-quality/air-quality.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AirQualityComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'air-quality';
}
