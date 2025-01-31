"use client";

import { Status } from "@/constants";
import { useState } from "react";

type SearchBarProps = {
  handleSearch: (searchText: string, status: Status) => void;
};

function SearchBar({ handleSearch }: SearchBarProps) {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState(Status.ALL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchText, status);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search issues..."
        className="w-full bg-white p-2 border rounded-lg"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Status)}
        className="p-2 bg-white border rounded-lg"
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
