import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import mapPinIcon from "../assets/MapPin.svg";
import { useMapStore, type PinT } from "../store/mapStore";
import { useMemo, useRef } from "react";

function CustomMarker({ pin }: { pin: PinT }) {
  const markerRef = useRef<L.Marker>(null);
  const { updateDragedPinFromList } = useMapStore();
  const markerIcon = new Icon({
    iconUrl: mapPinIcon,
    iconSize: [38, 38],
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;

        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          updateDragedPinFromList(pin.id, [lat, lng]);
          console.log(marker?.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <Marker
      ref={markerRef}
      draggable={true}
      eventHandlers={eventHandlers}
      icon={markerIcon}
      position={pin.coordinates}
      title={pin.dms}
    >
      <Popup>{pin.dms}</Popup>
    </Marker>
  );
}

export default CustomMarker;
