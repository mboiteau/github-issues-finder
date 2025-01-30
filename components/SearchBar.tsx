"use client";

import { useState } from "react";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState<"OPEN" | "CLOSED" | "ALL">("ALL");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchText);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search issues..."
        className="w-full p-2 border rounded-lg"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as "OPEN" | "CLOSED" | "ALL")}
        className="p-2 border rounded-lg"
      >
        <option value="ALL">All</option>
        <option value="OPEN">Open</option>
        <option value="CLOSED">Closed</option>
      </select>
      <button
        type="submit"
        className="px-6 py-2 bg-red-600 text-white rounded-lg"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
