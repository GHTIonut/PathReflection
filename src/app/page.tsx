"use client";

import { HoroscopeCard } from "@/00-Components/horoscopeCard";
import { Navbar } from "@/00-Components/navbar";
import { useState } from "react";

export default function Home() {
  const [dailyHoroscope, setDailyHoroscope] = useState<string | null>(null);
  const [dailyError, setDailyError] = useState<string | null>(null);
  return (
    <>
      <Navbar
        setDailyHoroscope={setDailyHoroscope}
        setDailyError={setDailyError}
      />
      <HoroscopeCard horoscope={dailyHoroscope} error={dailyError} />
    </>
  );
}
