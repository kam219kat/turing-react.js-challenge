import React from 'react';

const UserContact = ({ listId, info }) => (
    <div className='contactInfoWrapper' id={info?.id}>
        <div className='contactInfoThumbnail'>
            {info?.thumbnail && <img className='avatar' src={info?.thumbnail} alt='Avatar' />}
        </div>
        <div className='contactInfoText'>
            {info?.name && <p className='name'>{info?.name}</p>}
            {info?.phone && <p>{info?.phone}</p>}
        </div>
    </div>
);

export default UserContact;
