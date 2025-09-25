import { toast } from "react-toastify";
import { supabase } from "../utils/supabase";

export class AuthService {
  static async registerUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      if (!email || !password) {
        throw new Error("credentials not provided");
      }
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        throw error;
      }
      toast.success("user registered successfully");
      toast.success("Welcome to Map Pinboard");
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unable to register user");
      }
    }
  }
  static async loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        throw error;
      }
      toast.success("Welcome to Map Pinboard");
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unable to sign in user");
      }
    }
  }
  static async signOutUser() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast.success("Sign out successfull");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unable to sign out user");
      }
    }
  }
}
