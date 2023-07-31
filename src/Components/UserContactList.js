import React from 'react';
import ContactInfo from './UserContact';

const UserContactList = ({ listId, contactList }) => (
  <>
    {contactList.map((contact) => (
      <ContactInfo key={contact.id} info={contact} />
    ))}
  </>
);
export default UserContactList;
