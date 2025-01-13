import './Tile.css';
export default function Tile2({ className, children }) {
  return (
    <div className={`tile2 ${className}`}>
      {children}
    </div>
  );
}