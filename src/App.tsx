import Map from "./component/Map";
import PinList from "./component/PinList";
import { FiMap } from "react-icons/fi";
import { useMapStore } from "./store/mapStore";

function App() {
  const { togglePinListDisplay } = useMapStore();
  return (
    <div className="w-screen h-screen flex flex-col">
      <section
        onClick={togglePinListDisplay}
        className="cursor-pointer  flex-[10%] w-full p-3 flex gap-2 justify-center items-center bg-white text-black"
      >
        <FiMap size={25}></FiMap>
        <h4 className="font-semibold text-2xl">Map Pinboard</h4>
      </section>
      <section className="relative flex-[90%] h-full">
        <Map />
        <PinList />
      </section>
    </div>
  );
}

export default App;
