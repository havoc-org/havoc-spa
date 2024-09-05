import { useCallback } from 'react';
import './SearchBar.css';

function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export default function SearchBar({
  setResults,
  handleStartLoading,
  handleFinishLoading,
  fetchData,
  className,
}) {
  const memoizedDebounce = useCallback(debounce, []);
  const debouncedSearch = useCallback(
    memoizedDebounce((input) => {
      async function fetchSearchData() {
        handleStartLoading();
        const result = await fetchData();
        setResults(
          result.filter((p) =>
            p.name.toLowerCase().includes(input.toLowerCase())
          )
        );
        handleFinishLoading();
      }
      fetchSearchData();
    }, 500),
    [handleFinishLoading, handleStartLoading, setResults, fetchData]
  );
  const handleChange = (e) => debouncedSearch(e.target.value);

  return (
    <input
      className={className}
      type="search"
      placeholder="Search"
      onInput={(e) => handleChange(e)}
    />
  );
}
