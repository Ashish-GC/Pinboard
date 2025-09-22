import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import mapPinIcon from "../assets/MapPin.svg";
import { useMapStore } from "../store/mapStore";

function Pin() {
  const { pinList, setCurrentPin } = useMapStore();
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setCurrentPin([lat, lng]);
    },
  });
  const markerIcon = new Icon({
    iconUrl: mapPinIcon,
    iconSize: [38, 38],
  });

  return (
    <>
      {pinList.map((pin, index) => {
        return (
          <Marker key={index} icon={markerIcon} position={pin.coordinates}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default Pin;
