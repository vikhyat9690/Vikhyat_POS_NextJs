"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [cashierImage, setCashierImage] = useState("/images/default-image.png");
  const [isOnline, setIsOnline] = useState(true); // Default online
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cashierName ,setCashierName] = useState('');

  // Load cashier image from localStorage
  useEffect(() => {
    try {
      const cashierData = localStorage.getItem("cashier_data");
      if (cashierData) {
        const cashier = JSON.parse(cashierData);
        const cashierName = cashier && cashier?.firstname && cashier?.lastname
        ? cashier?.firstname + ' ' + cashier?.lastname
        : 'Cashier';
        setCashierName(cashierName);
        let cashierLogo = cashier?.cashier_image;
        if (typeof cashierLogo === "string") {
          try {
            cashierLogo = JSON.parse(cashierLogo);
          } catch {
            // ignore if not JSON
          }
        }

        if (cashierLogo?.url) {
          setCashierImage(cashierLogo.url);
        }
      }
    } catch (err) {
      console.error("Error loading cashier_data:", err);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("cashier_data");
    localStorage.removeItem('pos_token');
    window.location.reload(); // Or redirect to login page
  };

  // Toggle full screen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 shadow-md bg-black">
      {/* Cashier Image */}
      <div className="flex items-center gap-4">
        <Image
          src={cashierImage}
          height={60}
          width={60}
          alt="Cashier"
          className="rounded-full object-cover"
        />
        <span className="font-medium">{cashierName}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-6 items-center">
        {/* Online/Offline */}
        <button
          onClick={() => setIsOnline((prev) => !prev)}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isOnline ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {isOnline ? "Online" : "Offline"}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullScreen}
          className="px-3 py-1 rounded-md text-white bg-gray-800 hover:bg-gray-600"
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>
    </div>
  );
}
