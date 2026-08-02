import { FiMail, FiLock } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";


function Login() {
    const features = [
  "Client Management",
  "Project Tracking",
  "Team Collaboration",
  "Performance Analytics",
];

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/dashboard");

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};
  return (
    
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-slate-50 to-violet-50">

      {/* ================= LEFT SECTION ================= */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 text-white items-center justify-center p-16 relative overflow-hidden">

        {/* Decorative Blobs */}
        <div className="absolute w-72 h-72 rounded-full bg-white/10 blur-3xl top-20 left-20"></div>

        <div className="absolute w-96 h-96 rounded-full bg-pink-400/20 blur-3xl bottom-10 right-10"></div>

        <div className="relative z-10 max-w-md">

          <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-md">
            🚀 Creative Operations Platform
          </span>

          <h1 className=" text-7xl tracking-tight font-black mt-8 mb-6">
            BrandSync
          </h1>

          <p className="text-xl leading-9 opacity-90 mb-10">
            Manage clients, branding projects and business growth
            from one beautiful dashboard.
          </p>

          {/* Features */}

<div className="space-y-6 mt-10">
  {[
    "Client Management",
    "Project Tracking",
    "Team Collaboration",
    "Performance Analytics",
  ].map((feature) => (
    <div key={feature} className="flex items-center gap-3">
      <FiCheckCircle className="text-green-300 text-xl flex-shrink-0" />
      <span className="text-lg">{feature}</span>
    </div>
  ))}
</div>

{/* Divider */}

<div className="my-10 h-px bg-white/20"></div>

{/* Stats */}

<p className="uppercase tracking-[0.25em] text-xs text-white/60 mb-5">
    TRUSTED BY GROWING AGENCIES
</p>

<div className="grid grid-cols-3 gap-6">

  <div>
    <h3 className="text-3xl font-bold">250+</h3>
    <p className="text-white/70 text-sm mt-1">
      Clients
    </p>
  </div>

  <div>
    <h3 className="text-3xl font-bold">500+</h3>
    <p className="text-white/70 text-sm mt-1">
      Projects
    </p>
  </div>

  <div>
    <h3 className="text-3xl font-bold">98%</h3>
    <p className="text-white/70 text-sm mt-1">
      Satisfaction
    </p>
  </div>

</div>

        </div>

      </div>

      {/* ================= RIGHT SECTION ================= */}

      <div className="relative w-full lg:w-1/2 flex items-center justify-center overflow-hidden bg-slate-50 px-6">

        {/* Background Glow */}
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-violet-500/40 blur-[120px]"></div>
        
        <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full bg-pink-500/40 blur-[120px]"></div>

        {/* Login Card */}

        <div className="relative z-10 w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.15)] p-10">

         <h2 className="text-5xl font-bold">
            Welcome Back 👋
            </h2>

          <p className="mt-3 text-lg text-slate-500 leading-7">
          Sign in to continue managing your clients and projects.
          </p>

          <p className="mt-10 mb-8 text-gray-500">
            Login to continue
          </p>

          {/* Email */}

          <div className="mb-5">

            <label className="font-medium text-slate-700">
              Email
            </label>

            <div className="flex items-center mt-2 px-4 rounded-xl border border-gray-300 bg-gray-50 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-200 transition-all focus-within:shadow-lg focus-within:shadow-violet-200/50 transition-allduration-300">

              <FiMail className="text-gray-400 text-lg" />

             <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full p-4 outline-none bg-transparent"
/>

            </div>

          </div>

          {/* Password */}

          <div className="mb-8">

            <label className="font-medium text-slate-700">
              Password
            </label>

            <div className="flex items-center mt-2 px-4 rounded-xl border border-gray-300 bg-gray-50 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-200 transition-all focus-within:shadow-lg focus-within:shadow-violet-200/50 transition-allduration-300">

              <FiLock className="text-gray-400 text-lg" />

              <input
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-4 outline-none bg-transparent"
/>

            </div>

          </div>


          <div className="flex items-center justify-between mb-8">

  <label className="flex items-center gap-2 cursor-pointer">

    <input
      type="checkbox"
      className="w-4 h-4 accent-violet-600 cursor-pointer"
    />

    <span className="text-sm text-gray-600">
      Remember me
    </span>

  </label>

  <button
  
    className="text-sm text-violet-600 hover:text-violet-800 transition font-medium"
  >
    Forgot Password?
  </button>

</div>

          {/* Button */}

          <button onClick={handleLogin}
            className="
              w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r
              from-violet-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-violet-300/30
              transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]
              hover:shadow-2xl hover:shadow-violet-400/40 active:scale-95 "
          >
            <div className="flex justify-center items-center gap-2 group">
              Sign In
              <span className="transition-transform duration-300 group-hover:translate-x-1">→ </span>
            </div>
          </button>

          <p className="text-center mt-8 text-gray-500">
            Don't have an account?
            <span className="ml-2 text-violet-600 font-semibold cursor-pointer hover:text-violet-800 transition">
              Register
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;