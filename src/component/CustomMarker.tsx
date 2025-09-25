import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import mapPinIcon from "../assets/MapPin.svg";
import { useMapStore, type PinT } from "../store/mapStore";
import { useEffect, useMemo, useRef } from "react";
import { IoLocation } from "react-icons/io5";

function CustomMarker({ pin, index }: { pin: PinT; index: number }) {
  const markerRef = useRef<L.Marker>(null);
  const { updateDragedPinFromList, selectedPin } = useMapStore();
  const markerIcon = new Icon({
    iconUrl: mapPinIcon,
    iconSize: [40, 40],
  });

  useEffect(() => {
    if (selectedPin?.id === pin.id && markerRef.current) {
      markerRef.current.openPopup();
    } else {
      markerRef.current?.closePopup();
    }
  }, [selectedPin, pin]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;

        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          updateDragedPinFromList(pin.id, [lat, lng]);
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
      <Popup offset={[125, 35]} className="no-tip-popup">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-bold">Pin #{index + 1}</div>
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
