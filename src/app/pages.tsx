"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ResultsPage() {
  const params = useParams();
  const makeName = params.make as string;
  const year = params.year as string;

  const [models, setModels] = useState<{ Model_ID: number; Model_Name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!makeName || !year) return;

    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${makeName}/modelyear/${year}?format=json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Помилка при отриманні даних");
        }
        return res.json();
      })
      .then((data) => {
        if (!data.Results || data.Results.length === 0) {
          setError("Моделі не знайдено для цього року");
        } else {
          setModels(data.Results);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [makeName, year]);

  if (loading) return <p className="text-center text-xl">⏳ Завантаження...</p>;
  if (error) return <p className="text-center text-red-500">❌ {error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">
        🚗 Моделі {makeName} для {year}
      </h1>

      <ul className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        {models.map((model) => (
          <li key={model.Model_ID} className="border-b p-2">
            {model.Model_Name}
          </li>
        ))}
      </ul>

      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        🔙 Назад
      </Link>
    </div>
  );
}
