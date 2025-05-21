import React from "react";
import { Link } from "wouter";
import { useHabitContext } from "@/context/HabitContext";

const MobileHeader = () => {
  return (
    <header className="lg:hidden bg-white shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center text-white mr-3">
            <i className="ri-user-smile-line text-xl"></i>
          </div>
          <Link href="/">
            <a className="font-poppins font-semibold text-lg">
              Habit Hero
            </a>
          </Link>
        </div>
        <div>
          <Link href="/settings">
            <a className="p-2 rounded-full hover:bg-neutral-100" aria-label="Settings">
              <i className="ri-settings-3-line text-neutral-600 text-xl"></i>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
