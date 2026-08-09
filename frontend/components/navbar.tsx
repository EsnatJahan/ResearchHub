"use client";

import {
  Bell,
  Search,
  LogOut,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  // Get logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser: User =
          JSON.parse(storedUser);

        setUser(parsedUser);
      } catch (error) {
        console.error(
          "Failed to read user:",
          error
        );
      }
    }
  }, []);

  async function handleLogout() {
    try {
      await fetch(
        "http://localhost:3001/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    } finally {
      // Remove saved user information
      localStorage.removeItem("user");

      // Go to login page
      router.push("/");
    }
  }

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-6">

      {/* Logo / Title */}
      <h1 className="text-xl font-bold">
        ResearchHub AI
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="flex items-center rounded-lg border px-3 py-2">

          <Search size={18} />

          <input
            placeholder="Search..."
            className="ml-2 outline-none"
          />

        </div>

        {/* Notification */}
        <Bell
          className="cursor-pointer"
          size={21}
        />

        {/* User */}
        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/40"
            className="h-10 w-10 rounded-full"
            alt="Profile"
          />

          <div className="hidden md:block">

            <p className="font-semibold text-slate-800">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-slate-500">
              {user?.email || ""}
            </p>

          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          <LogOut size={17} />

          Logout
        </button>

      </div>
    </header>
  );
}