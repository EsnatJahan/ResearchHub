"use client";

import {
  Bell,
  Search,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-8">

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
          alt=""
        />

      </div>

    </header>
  );
}