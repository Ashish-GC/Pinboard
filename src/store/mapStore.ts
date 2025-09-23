import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { convertToDMS } from "../utils/utils";

export interface PinT {
  id: string;
  coordinates: [number, number];
  dms: string;
  showPopup: boolean;
}

interface MapStore {
  currentPin: PinT | null;
  pinList: PinT[];
  isPinListVisible: boolean;
  togglePinListDisplay: () => void;
  togglePopup: (pinId: string) => void;
  setCurrentPin: (coord: [number, number]) => void;
  addPintoList: (pin: PinT) => void;
  removePinFromList: (id: string) => void;
  updateDragedPinFromList: (id: string, coord: [number, number]) => void;
}

export const useMapStore = create<MapStore>()(
  persist(
    (set, get) => ({
      currentPin: null,
      pinList: [],
      isPinListVisible: true,
      togglePinListDisplay: () => {
        set((state) => ({
          isPinListVisible: !state.isPinListVisible,
        }));
      },
      togglePopup: (pinId: string) => {
        set((state) => ({
          pinList: state.pinList.map((pin) =>
            pin.id === pinId ? { ...pin, showPopup: !pin.showPopup } : pin
          ),
        }));
      },
      setCurrentPin: (coord: [number, number]) => {
        const id = uuidv4();
        const dms = convertToDMS(coord[0], coord[1]);
        const pin: PinT = {
          id,
          coordinates: coord,
          dms: `${dms.latDMS} ${dms.lngDMS}`,
          showPopup: false,
        };
        set({ currentPin: pin });
        get().addPintoList(pin);
      },
      addPintoList: (pin: PinT) => {
        set((state) => ({ pinList: [...state.pinList, pin] }));
      },
      removePinFromList: (id: string) => {
        set((state) => ({
          pinList: state.pinList.filter((pin) => pin.id !== id),
        }));
      },
      updateDragedPinFromList: (id, coord) => {
        const dms = convertToDMS(coord[0], coord[1]);
        set((state) => ({
          pinList: state.pinList.map((pin) =>
            pin.id === id
              ? { ...pin, coord: coord, dms: `${dms.latDMS} ${dms.lngDMS}` }
              : pin
          ),
        }));
      },
    }),
    {
      name: "pinLists-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
