import React from 'react';

const UserContact = ({ listId, info }) => (
    <div id={info?.id}>
        <div>
            {info?.thumbnail && <img src={info?.thumbnail} alt='Avatar' />}
        </div>
        <div>
            {info?.name && <p>{info?.name}</p>}
            {info?.phone && <p>{info?.phone}</p>}
        </div>
    </div>
);

export default UserContact;
