import * as React from 'react';
import './style.css';
import UserContactList from './Components/UserContactList';
import useContactList from './CustomHooks/useContactList';
import Header from './Components/Header';
import Paginator from './Components/Paginator';

export default function App() {
  const {
    hasNextPage,
    hasPrevPage,
    contactList,
    isSyncing,
    prevPage,
    nextPage,
    sync,
    currentPageList,
    page,
    onFilter,
    totalPages,
    syncError,
    search
  } = useContactList();

  return (
    <div>
      <Header isSyncing={isSyncing} sync={sync} search={search} onFilter={onFilter} />
      {/* Do not edit test id in below div, it's added for testing purpose */}
      <div data-testid='user-contact-list-wrapper'>
        <UserContactList listId='page' contactList={currentPageList} />
        {syncError && <p className='contactInfoDescriptionWrapper'>{syncError}</p>}
      </div>
      <Paginator
        hasPrevPage={hasPrevPage}
        prevPage={prevPage}
        hasNextPage={hasNextPage}
        nextPage={nextPage}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
}
