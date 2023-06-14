import React from 'react';

const Header = ({ isSyncing, sync, onFilter }) => (
  <div className="contactInfoHeaderWrapper">
    <div>Car Dashboard</div>
    <div>
      <input onChange={onFilter} />
    </div>
    <div>
      <button disabled={isSyncing} onClick={sync}>
        {isSyncing ? 'Syncing' : 'Sync'}
      </button>
    </div>
  </div>
);

export default Header;
