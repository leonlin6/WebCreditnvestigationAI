"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import FileSaver from "file-saver";

export default function Home() {
  const [companies, setCompanies] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Generate years from 2000 to current year
  // const years = Array.from(
  //   { length: new Date().getFullYear() - 1999 },
  //   (value, index) => (2000 + index).toString()
  // );

  useEffect(() => {
    // Fetch companies when component mounts
    const getCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/companies/name"
        );
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]);
      }
    };

    getCompanies();
  }, []);

  const handleSubmit = async () => {
    if (!selectedCompany || !selectedYear) {
      alert("Please select both company and year");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/report?year=${selectedYear}&companyName=${selectedCompany}`,
        {
          responseType: "blob",
          headers: {
            Accept:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          },
        }
      );

      // Create blob with correct MIME type
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Save the file
      await FileSaver.saveAs(
        blob,
        `${selectedCompany}_${selectedYear}_徵審報告書.docx`
      );
      // Handle the response data here
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          徵審報告書產生器
        </h1>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              欲查詢公司
            </label>
            <select
              id="company"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">請選擇公司</option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              欲查詢年份
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">請選擇年份</option>
              <option key={2024} value={2024}>
                2024
              </option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !selectedCompany || !selectedYear}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              loading || !selectedCompany || !selectedYear
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "報告製作中..." : "產生徵審報告書"}
          </button>
        </div>
      </div>
    </div>
  );
}
