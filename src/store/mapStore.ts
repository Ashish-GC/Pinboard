import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { convertToDMS } from "../utils/utils";

interface Pin {
  id: string;
  coordinates: [number, number];
  dms: string;
}

interface MapStore {
  currentPin: Pin | null;
  pinList: Pin[];
  setCurrentPin: (coord: [number, number]) => void;
  addPintoList: (pin: Pin) => void;
  removePinFromList: (id: string) => void;
}

export const useMapStore = create<MapStore>()(
  persist(
    (set, get) => ({
      currentPin: null,
      pinList: [],
      setCurrentPin: (coord: [number, number]) => {
        const id = uuidv4();
        const dms = convertToDMS(coord[0], coord[1]);
        const pin: Pin = {
          id,
          coordinates: coord,
          dms: `${dms.latDMS} ${dms.lngDMS}`,
        };
        set({ currentPin: pin });
        get().addPintoList(pin);
      },
      addPintoList: (pin: Pin) => {
        set((state) => ({ pinList: [...state.pinList, pin] }));
      },
      removePinFromList: (id: string) => {
        set((state) => ({
          pinList: state.pinList.filter((pin) => pin.id !== id),
        }));
      },
    }),
    {
      name: "pinLists-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
