import { useState, useRef } from 'react';
import BluetoothSyncAPI from './../Services/BluetoothSyncAPI.Service.V2';

/**
 * Custom React Hook responsible for sync with the Car's Bluetooth API
 */
const useContactList = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [syncError, setSyncError] = useState('');
  const [search, setSearch] = useState('');
  const count = useRef(5);
  /**
   * Call next page
   */
  const nextPage = () => {
    /**
     * if the offset plus count is less than the length of the list
     * set offset + count
     * update the offest to trigger a re-render
     **/
    setOffset(offset => {
      const nextOffset = offset + count.current;
      if (nextOffset < filteredList.length) {
        return nextOffset;
      }
      return offset;
    });
  };
  /**
   * Call previous page
   */
  const prevPage = () => {
    /**
     * if offset  less count greater than 0
     * set offset - count
     * update the offest to trigger a re-render
     *
     */
    setOffset(offset => {
      const prevOffset = offset - count.current;
      if (prevOffset > -1) {
        return prevOffset;
      }
      return offset;
    });
  };
  /**
   *
   */
  const onFilter = (event) => {
    /**
     * if offset  less count greater than 0
     * set offset - count
     * update the offest to trigger a re-render
     *
     */
    const value = event.target.value;
    const filteredList = list.filter(item => [item.name, item.email].some(i => i.includes(value)));
    setFilteredList(filteredList);
    setOffset(0);
    setSearch(value);
  };

  /**
   * Call the Bluetooth API and update the list
   */
  const sync = async () => {
    let users;
    setIsSyncing(true);
    setSyncError('');
    setSearch('');
    try {
      users = await BluetoothSyncAPI.sync();
    } catch (error) {
      users = [];
      setSyncError(error.message);
    }
    setList(users);
    setFilteredList(users);
    setIsSyncing(false);
    setOffset(0);
  };
  /**
   * Return the necessary functions
   */
  return {
    // Full list
    contactList: list,
    // Current page list
    currentPageList: filteredList.slice(offset, offset + count.current),
    // function used to sync with the Bluetooth API
    sync,
    // function to move the poiter to the next page
    nextPage,
    // function to mobe the pointer to the previous page
    prevPage,
    // variable that holds the value to indicate if the next page will be available or not
    hasNextPage: !(offset + count.current < filteredList.length),
    // variable that holds the value to indicate if the previous page will be available or not
    hasPrevPage: offset < count.current,
    // holds the value is the api is syncing or not
    isSyncing,
    // Current page number
    page: offset > 0 ? offset / count.current : offset,
    // Current page number
    totalPages: Math.ceil(filteredList.length / count.current),
    // The total os records
    total: filteredList.length,
    //
    onFilter,
    syncError,
    search
  };
};

export default useContactList;
