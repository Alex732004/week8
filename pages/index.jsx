import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

export default function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [year, setYear] = useState(2024);
  const [province, setProvince] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const holidaysPerPage = 10;

  const fetchHolidays = async (selectedYear) => {
    const response = await fetch(`https://canada-holidays.ca/api/v1/holidays?year=${selectedYear}`);
    const data = await response.json();
    setHolidays(data.holidays || []);
  };

  useEffect(() => {
    fetchHolidays(year);
  }, [year]);

  useEffect(() => {
    let filtered = holidays;

    if (province !== "All") {
      filtered = filtered.filter(holiday => 
        holiday.federal || holiday.provinces.some(pr => pr.id === province)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(holiday => 
        holiday.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredHolidays(filtered);
    setCurrentPage(1);
  }, [holidays, province, searchQuery]);

  useEffect(() => {
    router.push({
      pathname: "/",
      query: { year, province, searchQuery, page: currentPage }
    }, undefined, { shallow: true });
  }, [year, province, searchQuery, currentPage]);

  const paginatedHolidays = useMemo(() => {
    const start = (currentPage - 1) * holidaysPerPage;
    return filteredHolidays.slice(start, start + holidaysPerPage);
  }, [filteredHolidays, currentPage]);

  return (
    <div>
      <h1>Holidays</h1>

      <label>Year:</label>
      <select id="year-filter" value={year} onChange={e => setYear(e.target.value)}>
        {[...Array(11)].map((_, i) => (
          <option key={2020 + i} value={2020 + i}>{2020 + i}</option>
        ))}
      </select>

      <label>Province:</label>
      <select id="province-filter" value={province} onChange={e => setProvince(e.target.value)}>
        <option value="All">All</option>
        <option value="ON">ON</option>
        <option value="QC">QC</option>
        {/* Add other provinces here */}
      </select>

      <input
        id="holiday-search"
        type="text"
        placeholder="Search holiday..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      <table id="holidays-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Name (FR)</th>
            <th>Provinces</th>
          </tr>
        </thead>
        <tbody>
          {paginatedHolidays.map(holiday => (
            <tr key={holiday.id}>
              <td>{holiday.date}</td>
              <td>{holiday.nameEn}</td>
              <td>{holiday.nameFr}</td>
              <td>{holiday.federal ? "Federal" : holiday.provinces.map(pr => pr.id).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        id="prev-page"
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        id="next-page"
        onClick={() => setCurrentPage(prev => prev + 1)}
        disabled={currentPage * holidaysPerPage >= filteredHolidays.length}
      >
        Next
      </button>
    </div>
  );
}