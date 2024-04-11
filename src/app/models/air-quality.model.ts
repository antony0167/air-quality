interface Color {
  red: number;
  green: number;
  blue: number;
}

interface Index {
  code: string;
  displayName: string;
  aqi: number;
  aqiDisplay: string;
  color: Color;
  category: string;
  dominantPollutant: string;
}

export interface AirQualityData {
  dateTime: string;
  regionCode: string;
  indexes: Index[];
}
