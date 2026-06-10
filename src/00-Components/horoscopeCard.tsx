"use client";

type HoroscopeCardProps = {
  horoscope: string | null;
  error: string | null;
};

export function HoroscopeCard({ horoscope, error }: HoroscopeCardProps) {
  return (
    <>
      {horoscope ? (
        <div className=" border-2 rounded-2 sp-9 mt-12 border-cyan-800 text-white w-75 self-center">
          <h2>Daily Horoscope</h2>
          <div className="border-2 rounded-2">
            {horoscope}
            {error}
          </div>
        </div>
      ) : null}
    </>
  );
}
