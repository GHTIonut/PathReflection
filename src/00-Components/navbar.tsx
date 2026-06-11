"use client";

import { useState } from "react";
import Image from "next/image";
import PRLogo from "@/01-Images/PRLogo.png";
import HiddenMenu from "@/01-Images/HiddenMenu.png";

type NavbarProps = {
  setDailyHoroscope: React.Dispatch<React.SetStateAction<string | null>>;
  setDailyError: React.Dispatch<React.SetStateAction<string | null>>;
};

export function Navbar({ setDailyHoroscope, setDailyError }: NavbarProps) {
  const signs = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  const [showMenu, setShow] = useState<boolean>(false);
  const [showZodiacMenu, setShowZodiacMenu] = useState<boolean>(false);

  function dropMenu() {
    setShow(!showMenu);
    setShowZodiacMenu(false);
  }

  function dropZodiacMenu() {
    setShowZodiacMenu(!showZodiacMenu);
  }

  async function fetchData(sign: string) {
    try {
      const response = await fetch(`/api/daily-horoscope?sign=${sign}`);
      if (!response.ok) {
        throw new Error(`Request failed!`);
      }
      const result = await response.json();
      setDailyHoroscope(result.data.horoscope);
    } catch {
      setDailyError(`Request failed! Our team is working on it.`);
      setDailyHoroscope(null);
    }
    setShow(!showMenu);
  }
  return (
    <div className="relative flex items-center justify-between border-b border-cyan-900 bg-gradient-to-r from-slate-950 via-black to-slate-950 px-4 py-3 shadow-lg">
      <span>
        <Image src={PRLogo} alt="PathReflectionLogo" className="w-60" />
      </span>
      <span>
        <Image
          src={HiddenMenu}
          alt="Hamburger Button"
          className="w-11 cursor-pointer rounded-lg p-1 transition-all duration-300 hover:bg-cyan-900/30 hover:scale-110"
          onClick={() => dropMenu()}
        />
      </span>

      {showMenu && (
        <ul className="absolute right-3 top-18 z-50 min-w-56 rounded-xl border border-cyan-900 bg-slate-950/95 backdrop-blur-md shadow-2x loverflow-hidden">
          <li className="bg-gray-950">
            <button
              className="flex w-full items-center justify-between px-4 py-3 text-left text-cyan-300 transition-colors hover:bg-cyan-950"
              onClick={() => dropZodiacMenu()}
            >
              Daily Zodiac
            </button>
            {showZodiacMenu && (
              <ul>
                {signs.map((item, index) => (
                  <li
                    className="cursor-pointer px-4 py-2 text-slate-200 transition-all duration-200 hover:bg-cyan-900 hover:text-white"
                    key={index}
                    onClick={() => fetchData(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      )}
    </div>
  );
}
