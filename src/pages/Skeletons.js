import React from 'react';

export const Shimmer = () => {
  return (
    <div className='shimmer-wrapper'>
      <div className='shimmer'></div>
    </div>
  );
};

export const IconSkeleton = () => {
  return <div className='skeleton-icon'></div>;
};

export const ImageSkeleton = ({ size }) => {
  return (
    <div className='skeleton-relative'>
      <div className={`skeleton-img-${size}`}>
        <Shimmer />
      </div>
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className='skeleton-div-row'>
      <IconSkeleton />
      <div className='skeleton-h1text'>Loading...</div>
      <IconSkeleton />
      <Shimmer />
    </div>
  );
};

export const WelcomeSkeleton = () => {
  return (
    <>
      <div className='skeleton-img-sml' />
      <div className='skeleton-spacer'></div>
      <div className='skeleton-h1'></div>
      <p className='skeleton-p'></p>
      <div className='skeleton-img-med' />
      <div className='skeleton-h1'></div>
      <p className='skeleton-p'></p>
      <div className='skeleton-btn'></div>
    </>
  );
};

export const SearchResultsSkeleton = () => {
  return (
    <div className='skeleton-div skeleton-hidden'>
      <div className='skeleton-wide'>
        <Shimmer />
      </div>
      <div className='skeleton-div skeleton-hidden'>
        <LocationPreviewSkeleton />
        <LocationPreviewSkeleton />
        <LocationPreviewSkeleton />
      </div>
    </div>
  );
};

export const LocationPreviewSkeleton = () => {
  return (
    <div className='skeleton-div-row'>
      <div className='skeleton-img' />
      <div className='skeleton-div skeleton-hidden'>
        <h4 className='skeleton-h'></h4>
        <p className='skeleton-p'></p>
        <p className='skeleton-p'></p>
        <p className='skeleton-p'></p>
      </div>
      <Shimmer />
    </div>
  );
};

export const LoginSkeleton = ({ header, message }) => {
  return (
    <div className='skeleton-div skeleton-hidden'>
      <h1 className='skeleton-h1text'>{header || ''}</h1>
      <p className='skeleton-ptext'>{message || ''}</p>
      <div className='skeleton-spacer'></div>
      <div className='skeleton-div'>
        <div className='skeleton-left'></div>
        <div className='skeleton-wide'></div>
        <div className='skeleton-left'></div>
        <div className='skeleton-wide'></div>
        <div className='skeleton-left'></div>
        <div className='skeleton-wide'></div>
      </div>
      <div className='skeleton-btn'></div>
      <Shimmer />
    </div>
  );
};

export const AppointmentsSkeleton = () => {
  return (
    <div className='skeleton-div skeleton-hidden'>
      <h1 className='skeleton-h1'></h1>
      <p className='skeleton-wide'></p>
      <div className='skeleton-spacer'></div>
      <div className='skeleton-div'>
        <h4 className='skeleton-h'></h4>
        <p className='skeleton-p'></p>
        <div className='skeleton-spacer'></div>
        <h4 className='skeleton-h'></h4>
        <p className='skeleton-p'></p>
      </div>
      <Shimmer />
    </div>
  );
};

export const AccountSkeleton = () => {
  return (
    <div className='skeleton-div'>
      <div className='skeleton-div-row'>
        <div className='skeleton-img' />
        <h1 className='skeleton-h'></h1>
      </div>
      <div className='skeleton-spacer'></div>
      <div className='skeleton-div'>
        <AccountItemSkeleton />
        <AccountItemSkeleton />
        <AccountItemSkeleton />
        <AccountItemSkeleton />
        <AccountItemSkeleton />
        <AccountItemSkeleton />
        <AccountItemSkeleton />
        <AccountItemSkeleton />
        <AccountItemSkeleton />
      </div>
      <Shimmer />
    </div>
  );
};

export const AccountItemSkeleton = ({ message }) => {
  return (
    <div className='skeleton-div-account-item'>
      <div className='skeleton-left'></div>
      <p className='skeleton-ptext'>{message || ''}</p>
      <div className='skeleton-right'></div>
      <Shimmer />
    </div>
  );
};

export default AccountSkeleton;
