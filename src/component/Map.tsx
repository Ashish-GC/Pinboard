import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "./Pin";
import { useEffect, useState } from "react";

function Map() {
  const [userLocation, setUserLocation] = useState<[number, number]>([
    -37.8136, 144.9631,
  ]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {!isLoading && (
        <MapContainer
          center={userLocation}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Pin />
        </MapContainer>
      )}
    </>
  );
}

export default Map;
