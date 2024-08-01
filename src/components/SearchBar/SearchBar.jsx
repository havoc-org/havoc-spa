import apiService from '../../services/apiService';
import './SearchBar.css';
import { useEffect, useState } from 'react';
export default function SearchBar({
  setResults,
  handleStartLoading,
  handleFinishLoading,
}) {
  const [input, setInput] = useState('');

  useEffect(() => {
    async function fetchSearchData() {
      handleStartLoading();
      const result = await apiService.get('/projects', {});
      setResults(
        result.filter((p) => p.name.toLowerCase().includes(input.toLowerCase()))
      );
      handleFinishLoading();
    }
    const debouncer = setTimeout(fetchSearchData, 500);
    return () => clearTimeout(debouncer);
  }, [input, setResults, handleFinishLoading, handleStartLoading]);

  return (
    <input
      type="search"
      value={input}
      placeholder="Search"
      onInput={(e) => {
        setInput(e.target.value);
      }}
    />
  );
}
