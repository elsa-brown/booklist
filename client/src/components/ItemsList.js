import React from 'react';

import AddItem from './AddItem';

const ItemsList = ({ items }) => {
  return (
    <div className="itemsList">
      <AddItem />
      { items.map( item =>
        (<div key={item.id} className={'item ' + (item.id < 0 ? 'optimistic' : '')}>
            {item.name}
        </div>)
      )}
      
    </div>
  );
};
export default (ItemsList);
