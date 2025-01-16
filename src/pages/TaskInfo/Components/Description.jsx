export default function Description({ description, setDescription }) {
  return (
    <div className="task-description">
      <h2>Description</h2>
      <textarea
        className="description-input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}
