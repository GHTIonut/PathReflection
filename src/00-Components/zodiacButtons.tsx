"use client";

import { sign } from "crypto";
// De adaugat butoanele pentru weekly horoscope

import { useState } from "react";

export function ZodiacButtons() {
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

  const [weeklyHoroscope, setWeeklyHoroscope] = useState<string | null>(null);
  const [weeklyError, setWeeklyError] = useState<string | null>(null);

  const [change, setChange] = useState<boolean>(false);

  async function fetchData(sign: string) {
    try {
      const response = await fetch(`/api/daily-horoscope?sign=${sign}`);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      setDailyHoroscope(result.data.horoscope);
    } catch (error) {
      setDailyError(`Error is ${error}`);
      setDailyHoroscope(null);
    }
  }

  async function getWeeklyHoroscope(sign: string) {
    try {
      const response = await fetch(`/api/weekly-horoscope?sign=${sign}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      const result = await response.json();
      console.log(result);
      setWeeklyHoroscope(result.data.horoscope);
    } catch (error) {
      setWeeklyHoroscope(null);
      setWeeklyError(`Error is ${error}`);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <select
          aria-label="signs"
          name="signs"
          id="signs"
          className="border p-3 font-bold font-serif"
          onChange={(e) => fetchData(e.target.value)}
        >
          {signs.map((item, idx) => (
            <option key={idx}>{item}</option>
          ))}
        </select>
      </div>

      <div>{dailyHoroscope ? dailyHoroscope : dailyError}</div>
      {/* <button
          className="border w-30 rounded bg-neutral-500 cursor-pointer"
          onClick={() => getWeeklyHoroscope("aries")}
        >
          Aries
        </button>
        <span>{weeklyHoroscope ? weeklyHoroscope : weeklyError}</span> */}
    </div>
  );
}
