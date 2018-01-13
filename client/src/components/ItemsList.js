import React from 'react';

import AddItem from './AddItem';

const ItemsList = ({ items }) => {
  return (
    <div className="messagesList">
      { items.map( item =>
        (<div key={item.id} className={'message ' + (item.id < 0 ? 'optimistic' : '')}>
            {item.name}
        </div>)
      )}
      <AddItem />
    </div>
  );
};
export default (ItemsList);
