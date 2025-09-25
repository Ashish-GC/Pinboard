import { useMapStore } from "../store/mapStore";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoLocation } from "react-icons/io5";

function PinList() {
  const { pinList, removePinFromList, isPinListVisible } = useMapStore();

  return (
    isPinListVisible && (
      <div className="absolute top-135 left-0 md:top-158 lg:top-4 lg:left-4 bg-white shadow-2xl  h-[100%] lg:h-[95%] w-[100%] lg:w-[30%] xl:w-[25%] 2xl:w-[22%]   border border-gray-300 z-[1000] text-black rounded-xl overflow-hidden">
        <div className="flex p-5 items-center justify-between  border-b border-gray-300 sticky">
          <p className="text-lg font-semibold">Pin Lists</p>
        </div>

        <ul className="p-[0.2] h-[90%] overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {pinList.length === 0 && (
            <div className=" mt-6  flex flex-col justify-center items-center gap-1">
              <CiSearch size={28} color="gray" />
              <p className="text-base font-semibold text-gray-500">
                No Result Found
              </p>
              <p className="text-sm text-gray-400">
                Your map pin list will show in here
              </p>
            </div>
          )}
          {pinList.map((pin, index) => (
            <li
              tabIndex={index}
              onMouseEnter={() => useMapStore.setState({ selectedPin: pin })}
              onMouseLeave={() => {
                useMapStore.setState({ selectedPin: null });
              }}
              key={index}
              className="focus:border-2 focus:border-blue-500 px-5 cursor-pointer hover:bg-gray-100 flex items-center justify-between border-b last:border-b-0 border-gray-200 py-4"
            >
              <div className=" flex items-center gap-1">
                <span className="text-sm p-5 rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center mr-3 bg-gray-100 text-blue-600 font-medium">
                  #{index + 1}
                </span>
                <div>
                  <div className="text-base font-semibold">
                    Pin #{index + 1}
                  </div>
                  <div className=" text-gray-500 flex gap-1 items-center">
                    <IoLocation size={12} color="gray" />
                    <span className="text-xs">{pin.dms}</span>
                  </div>
                </div>
              </div>
              <div
                className="p-2 border-1 border-gray-300 hover:border-gray-400 rounded-full"
                onClick={() => removePinFromList(pin.id)}
              >
                <FaRegTrashAlt
                  size={16}
                  className="text-red-500 cursor-pointer  "
                />
              </div>
            </li>
          ))}
          <li className="mb-5"></li>
        </ul>
      </div>
    )
  );
}

export default PinList;
