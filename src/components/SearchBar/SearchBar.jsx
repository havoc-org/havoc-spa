import './SearchBar.css';

export default function SearchBar({
  setResults,
  projects,
  original,
  className,
}) {
  const handleChange = (e) =>
    e.target.value === ''
      ? setResults(original)
      : setResults(
          projects.filter((p) =>
            p.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );

  return (
    <input
      className={className}
      type="search"
      placeholder="Search"
      onInput={(e) => handleChange(e)}
    />
  );
}