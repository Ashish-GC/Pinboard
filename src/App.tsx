import Map from "./component/Map";
import PinList from "./component/PinList";
import { FiMap } from "react-icons/fi";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <section className="flex-[10%] w-full p-3 flex gap-2 justify-center items-center bg-white text-black">
        <FiMap size={25}></FiMap>
        <h4 className="font-semibold text-2xl">Map Pinboard</h4>
      </section>
      <section className="relative flex-[90%]">
        <Map />
        <PinList />
      </section>
    </div>
  );
}

export default App;
