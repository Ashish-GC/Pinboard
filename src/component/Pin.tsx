import { useMapEvents } from "react-leaflet";
import { useMapStore } from "../store/mapStore";
import CustomMarker from "./CustomMarker";

function Pin() {
  const { pinList, setCurrentPin } = useMapStore();
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setCurrentPin([lat, lng]);
    },
  });

  return (
    <>
      {pinList.map((pin, index) => {
        return <CustomMarker key={index} pin={pin}></CustomMarker>;
      })}
    </>
  );
}

export default Pin;
