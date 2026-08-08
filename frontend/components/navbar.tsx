"use client";

import {
  Bell,
  Search,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

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
      router.push("/login");
    }
  }

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">

      <h1 className="text-xl font-bold">
        ResearchHub AI
      </h1>

      <div className="flex items-center gap-6">

        <div className="flex items-center rounded-lg border px-3 py-2">
          <Search size={18} />

          <input
            placeholder="Search..."
            className="ml-2 outline-none"
          />
        </div>

        <Bell className="cursor-pointer" />

        <img
          src="https://i.pravatar.cc/40"
          className="h-10 w-10 rounded-full"
          alt="Profile"
        />

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