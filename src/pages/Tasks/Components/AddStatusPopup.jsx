// addStatusPopup.jsx

import Popup from 'reactjs-popup';
import './PopupStyles.css';

const AddStatusPopup = ({ trigger, items,onItemClick  }) => {
  const Menu = ({ items,close }) => (
    <div className="menu">
{items.map((item, index) => (
          <div key={index} className="menu-item"
          onClick={() => {onItemClick(item); close();}}>
            <h3>{item.name}</h3>
          </div>
        ))}
      
    </div>
  );

  return (
    <Popup
    trigger={trigger}
    
    position=" top center"  // Позиционирование в месте клика
    closeOnDocumentClick
    arrow={false}
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">Add new status</div>
          <div className="actions">
            <Menu items={items} close={close} />
          </div>
        </div>
      )}
    </Popup>
  );
};

export default AddStatusPopup;
