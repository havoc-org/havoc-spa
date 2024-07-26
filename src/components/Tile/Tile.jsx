import './Tile.css';
export default function Tile({ width, children }) {
  return (
    <div className="tile" style={{ width: width }}>
      {children}
    </div>
  );
}
