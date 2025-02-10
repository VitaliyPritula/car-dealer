import { notFound } from "next/navigation";

interface Props {
  params: { make: string; year: string };
}

export default async function ResultsPage({ params }: Props) {
  const { make, year } = params;

  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`
  );

  if (!res.ok) {
    return notFound();
  }

  const data = await res.json();

  if (!data.Results || data.Results.length === 0) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">🚗 Моделі {make} ({year})</h1>
      <ul className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        {data.Results.map((car: { Model_ID: number; Model_Name: string }) => (
          <li key={car.Model_ID} className="border-b p-2">
            {car.Model_Name}
          </li>
        ))}
      </ul>
    </div>
  );
}
