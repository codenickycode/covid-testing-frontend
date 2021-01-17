import React, { useState, useContext } from 'react';
import { HeaderName } from '../../Providers/AccountProvider.js';
import dayjs from 'dayjs';
import { ImageSkeleton } from '../Skeletons.js';

const AccountHeader = () => {
  const headerName = useContext(HeaderName);

  const [showImg, setShowImg] = useState(false);

  const now = new dayjs();
  const time =
    now.$H > 3 && now.$H < 12
      ? 'morning'
      : now.$H < 17
      ? 'afternoon'
      : 'evening';

  return (
    <div className='account-header'>
      <div className='avatar'>
        {!showImg && <ImageSkeleton size='sml' />}
        <img
          className={showImg ? '' : 'display-none'}
          src='/img/salad-cat.png'
          alt='User'
          onLoad={() => setShowImg(true)}
        />
      </div>
      <h1>{`Good ${time}${headerName ? `, ${headerName}!` : '!'}`}</h1>
    </div>
  );
};

export default AccountHeader;
