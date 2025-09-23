import { useMapStore } from "../store/mapStore";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

function PinList() {
  const { pinList, removePinFromList, isPinListVisible } = useMapStore();

  return (
    isPinListVisible && (
      <div className="absolute top-100 left-0 md:top-158 lg:top-2 lg:left-2 bg-white shadow-2xl p-6 h-[60%] lg:h-[97%] w-[100%] lg:w-[30%] xl:w-[25%] 2xl:w-[20%]   border border-gray-300 z-[1000] text-black rounded-2xl overflow-hidden">
        <div className="flex p-2 items-center justify-between mb-2 border-b border-gray-300 sticky">
          <p className="text-lg font-semibold">Pin Lists</p>
        </div>

        <ul className="h-[90%] mt-2 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {pinList.length === 0 && (
            <div className=" mt-4  flex flex-col justify-center items-center gap-1">
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
              key={index}
              className="flex items-center justify-between border-b last:border-b-0 border-gray-200 py-4"
            >
              <div className="flex items-center">
                <span className="rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center mr-3 bg-gray-100 text-blue-600 font-medium">
                  #{index + 1}
                </span>
                <div>
                  <div className="font-medium">Pin #{index + 1}</div>
                  <div className="text-sm text-gray-500">{pin.dms}</div>
                </div>
              </div>

              <FaRegTrashAlt
                size={18}
                className="text-red-500 cursor-pointer"
                onClick={() => removePinFromList(pin.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default PinList;
