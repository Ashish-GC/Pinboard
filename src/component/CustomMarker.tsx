import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import mapPinIcon from "../assets/MapPin.svg";
import { useMapStore, type PinT } from "../store/mapStore";
import { useMemo, useRef } from "react";
import { IoLocation } from "react-icons/io5";

function CustomMarker({ pin, index }: { pin: PinT; index: number }) {
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
      <Popup>
        <div className="flex flex-col gap-1">
          <div className="text-base font-bold">Pin #{index + 1}</div>
          <div className=" text-gray-500 flex gap-1 items-center">
            <IoLocation size={12} color="gray" />
            <span className="text-xs">{pin.dms}</span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default CustomMarker;
