// src/types/leaflet-control-geocoder.d.ts
import "leaflet";

declare module "leaflet" {
  namespace Control {
    function geocoder(options?: GeocoderOptions): Control;
  }

  interface GeocoderOptions {
    defaultMarkGeocode?: boolean;
    placeholder?: string;
    position?: ControlPosition;
  }
}
