export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sign = searchParams.get("sign");

  const response = await fetch(
    `https://freehoroscopeapi.com/api/v1/get-horoscope/daily?sign=${sign}`,
  );

  const data = await response.json();

  return Response.json(data);
}
