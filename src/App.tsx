import Map from "./component/Map";
import PinList from "./component/PinList";
import { FiMap } from "react-icons/fi";
import { useState, useEffect } from "react";
import type { Session, Subscription } from "@supabase/supabase-js";
import { supabase } from "./utils/supabase";
import LoginCard from "./auth/LoginCard";
import { LogOut } from "lucide-react";
import { AuthService } from "./service/authService";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let subscription: Subscription;

    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);

        const {
          data: { subscription: sub },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
        subscription = sub;
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <>
      {!isLoading && !session && <LoginCard />}
      {session && (
        <div className="w-screen h-screen flex flex-col relative">
          <section className="cursor-pointer  flex-[5%] lg:flex-[10%] w-full p-3 flex  justify-between items-center bg-white text-black sticky">
            <div className="flex gap-2 justify-center items-center w-full">
              <FiMap size={25}></FiMap>
              <h4 className="font-semibold text-2xl">Map Pinboard</h4>
            </div>
            <LogOut
              onClick={() => AuthService.signOutUser()}
              size={24}
              color="gray"
            />
          </section>
          <section className="relative flex-auto h-full">
            <Map />
            <PinList />
          </section>
        </div>
      )}
    </>
  );
}

export default App;
