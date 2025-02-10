"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [makes, setMakes] = useState<{ MakeId: number; MakeName: string }[]>(
    []
  );
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const years = Array.from(
    { length: new Date().getFullYear() - 2014 },
    (_, i) => 2015 + i
  );

  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    )
      .then((res) => res.json())
      .then((data) => setMakes(data.Results));
  }, []);

  return (
    <div className="min-h-screen flex gap-5 flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Оберіть марку та рік випуску</h1>

      {/* Вибір марки авто */}
      <select
        className="p-2 border mb-4 w-28"
        value={selectedMake}
        onChange={(e) => setSelectedMake(e.target.value)}
      >
        <option value="">Оберіть марку</option>
        {makes.map((make) => (
          <option key={make.MakeId} value={make.MakeName}>
            {make.MakeName}
          </option>
        ))}
      </select>

      {/* Вибір року випуску */}
      <select
        className="p-2 border mb-4 w-28"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Оберіть рік</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Кнопка "Далі" */}
      <Link
        href={selectedMake && selectedYear ? `/results/${selectedMake}/${selectedYear}` : "#"}
        className={`p-2 bg-blue-500 text-white rounded ${
          !selectedMake || !selectedYear ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={(e) => (!selectedMake || !selectedYear) && e.preventDefault()}
      >
        Далі
      </Link>
    </div>
  );
}
