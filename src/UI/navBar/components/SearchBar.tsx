'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import queryString from "query-string"

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if(!query || query === "") {
      router.push("/");
      return;
    }

    const url = queryString.stringifyUrl({
        url: "/",
        query: { searchTerm: query }
    }, { skipNull: true });

    router.push(url);
    setQuery("");
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => { if(e.key === "Enter") handleSearch(); }} // agregado para disparar búsqueda con Enter
        className="border p-2 rounded-l"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-950 text-white p-2 rounded-r"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
