"use client";

import { useState } from "react";
import Image from "next/image";
import PRLogo from "@/01-Images/PRLogo.png";
import HiddenMenu from "@/01-Images/HiddenMenu.png";

export function Navbar() {
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
  const [dailyHoroscope, setDailyHoroscope] = useState<string | null>(null);
  const [dailyError, setDailyError] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);
  function dropMenu() {
    setShow(!show);
  }

  async function fetchData(sign: string) {
    try {
      const response = await fetch(`/api/daily-horoscope?sign=${sign}`);
      if (!response.ok) {
        throw new Error(`Request failed!`);
      }
      const result = await response.json();
      setDailyHoroscope(result.data.horoscope);
    } catch (error) {
      setDailyError(`Error is ${error}`);
      setDailyHoroscope(null);
    }
  }
  return (
    <div className="flex flex-row justify-between items-center align-center p-1.5 border-b  border-b-cyan-800">
      {/* <div className="bg-black flex flex-row justify-between "> */}
      <span>
        <Image src={PRLogo} alt="PathReflectionLogo" className="w-60" />
      </span>
      <span>
        <Image
          src={HiddenMenu}
          alt="Hamburger Button"
          className="w-11 cursor-pointer"
          onClick={() => dropMenu()}
        />
      </span>

      {show ? (
        <select
          aria-label="signs"
          name="signs"
          id="signs"
          className="border p-3 font-bold font-serif bg-blue-900 absolute right-0 top-18 z-50 "
          onChange={(e) => fetchData(e.target.value.toLocaleLowerCase())}
        >
          {signs.map((item, idx) => (
            <option key={idx} className="absolute left-10">
              {item}
            </option>
          ))}
        </select>
      ) : null}

      {dailyHoroscope}
      {dailyError}
    </div>
  );
}
