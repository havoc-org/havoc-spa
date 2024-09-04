import './SearchBar.css';
import { useEffect, useState } from 'react';
export default function SearchBar({
  setResults,
  handleStartLoading,
  handleFinishLoading,
  fetchData,
  className,
}) {
  const [input, setInput] = useState(undefined);
  useEffect(() => {
    async function fetchSearchData() {
      handleStartLoading();
      const result = await fetchData();
      setResults(
        result.filter((p) => p.name.toLowerCase().includes(input.toLowerCase()))
      );
      handleFinishLoading();
    }
    if (input !== undefined) {
      const debouncer = setTimeout(fetchSearchData, 500);
      return () => clearTimeout(debouncer);
    }
  }, [input, setResults, handleFinishLoading, handleStartLoading, fetchData]);

  return (
    <input
      className={className}
      type="search"
      value={input}
      placeholder="Search"
      onInput={(e) => {
        setInput(e.target.value);
      }}
    />
  );
}
