export interface GeocodingData {
  results: GeocodingResult[];
  status: string;
}

export interface GeocodingResult {
  address_components: [
    {
      long_name: string;
      short_name: string;
      types: string[];
    }
  ];
  formatted_address: string;
  geometry: {
    bounds: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
    location: {
      lat: number;
      lng: number;
    };
    location_type: string;
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  place_id: string;
  types: string[];
}
