import './Tile.css';
export default function Tile({ className, children }) {
  return (
    <div className={'tile' + (className == undefined ? '' : ' ' + className)}>
      {children}
    </div>
  );
}
