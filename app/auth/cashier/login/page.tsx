"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CASHIER_LOGIN } from "@/app/Api/CashierLogin";
import {motion} from 'framer-motion';
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [login, { data, loading, error }] = useMutation(CASHIER_LOGIN);
  const [cashierData, setCashierData] = useState([]);


  const handleLogin = async () => {
    try {
      const res = await login({ variables: { email, password } });
      if (res?.data?.cashierLogin?.token) {
        const cashierData = res?.data?.cashierLogin 
        ? JSON.stringify(res?.data?.cashierLogin)
        : '';
        localStorage.setItem("cashier_data", cashierData)
        localStorage.setItem("pos_token", res.data.cashierLogin.token);
        router.replace('/sync')    
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl bg-gray-800/90 p-8 shadow-2xl backdrop-blur-lg"
      >
        {/* Logo / Title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-wide">POS Login</h1>
          <p className="mt-1 text-gray-400 text-sm">Sign in to continue</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-gray-600 bg-gray-900 p-3 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-gray-600 bg-gray-900 p-3 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            disabled={loading}
            className="rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
