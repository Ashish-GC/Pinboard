import { useState } from "react";
import { FiMap } from "react-icons/fi";
import { AuthService } from "../service/authService";
import { z, ZodError } from "zod";
import { Info, Mail, Lock, EyeOff, Eye, Loader2 } from "lucide-react";
import { useMapStore } from "../store/mapStore";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email field is required")
    .email("Invalid email"),
  password: z.string().trim().nonempty("Password field is required"),
});

const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email field is required")
    .email("Invalid email"),
  password: z
    .string()
    .trim()
    .nonempty("Password field is required")
    .min(
      6,
      "Password must be at least 6 characters and include a uppercase, lowercase, number, and special character."
    )
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
      "Password must be at least 6 characters and include a uppercase, lowercase, number, and special character."
    ),
});

export default function LoginCard() {
  const [screen, setScreen] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (screen === "sign-in") {
        loginSchema.parse({ email, password });
        const data = await AuthService.loginUser({ email, password });
        if (data?.user?.id && data?.user?.email) {
          useMapStore.setState({
            user: { id: data?.user.id, email: data?.user?.email || "" },
          });
        }

        setEmail("");
        setPassword("");
      } else {
        registerSchema.parse({ email, password });
        const data = await AuthService.registerUser({ email, password });
        if (data?.user?.id && data?.user?.email) {
          useMapStore.setState({
            user: { id: data?.user.id, email: data?.user?.email || "" },
          });
        }

        setEmail("");
        setPassword("");
      }
      setIsSubmitting(false);
    } catch (error: unknown) {
      setEmail("");
      setPassword("");
      setIsSubmitting(false);
      if (error instanceof ZodError) {
        error.errors.map((err) => {
          if (err.path[0] === "email") {
            setEmailError(err?.message || "Invalid Email");
          }
          if (err.path[0] === "password") {
            setPasswordError(err?.message);
          }
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen ">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-10">
        {/* Header */}
        <div className="flex items-center justify-center  gap-3">
          <FiMap size={15} />
          <h2 className="text-base font-semibold text-gray-800">
            Map Pinboard
          </h2>
        </div>

        {/* Title */}
        <div className="text-center ">
          <h3 className="text-lg font-semibold text-gray-900">
            {screen === "sign-in" ? "Account Login" : "Account Register"}
          </h3>
          <p className="text-sm text-gray-500">
            {screen === "sign-in"
              ? "Please enter your details to sign in"
              : "Please enter your details to sign up"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">
              {" "}
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail
                strokeWidth="2.5"
                className={`${
                  emailError && "text-red-500"
                } absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400`}
              />
              <input
                type="email"
                value={email}
                onFocus={() => setEmailError("")}
                onChange={(e) => setEmail(e.target.value)}
                className={` ${
                  emailError ? "border-red-300" : "border-gray-300"
                } w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-australian-green`}
                placeholder="Type here"
                required
              />
            </div>
            {emailError && (
              <p className=" text-red-700 text-sm flex gap-1 m-2 items-center">
                <Info color="red" size={16} strokeWidth="2.5" />
                {emailError}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock
                strokeWidth="2.5"
                className={`${
                  passwordError && "text-red-500"
                } absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400`}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onFocus={() => setPasswordError("")}
                onChange={(e) => setPassword(e.target.value)}
                className={`${
                  passwordError ? "border-red-300" : "border-gray-300"
                } w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-australian-green`}
                placeholder="Type here"
                required
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </div>
            </div>
            {passwordError && (
              <p className=" text-red-700 text-sm flex gap-1 m-2 items-center">
                <Info color="red" size={16} strokeWidth="2.5" />
                {passwordError}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className=" flex justify-center items-center gap-2 mt-4 cursor-pointer w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition"
          >
            {isSubmitting && <Loader2 size={15} className="animate-spin" />}

            {screen === "sign-in" ? "Log in" : "Register"}
          </button>
          {screen === "sign-in" && (
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <span
                className="text-blue underline cursor-pointer"
                onClick={() => setScreen("register")}
              >
                Register
              </span>
            </p>
          )}
          {screen === "register" && (
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <span
                className="text-blue underline cursor-pointer"
                onClick={() => setScreen("sign-in")}
              >
                Log in
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
