export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const sign = searchParams.get("sign");
  const response = await fetch(
    `https://freehoroscopeapi.com/api/v1/get-horoscope/weekly?sign=${sign}`,
  );
  const weeklyHoroscope = await response.json();
  return Response.json(weeklyHoroscope);
}
