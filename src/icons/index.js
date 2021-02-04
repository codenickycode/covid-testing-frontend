import { ReactComponent as LogoIcon } from './Logo.svg';
import { ReactComponent as ProfileIcon } from './Profile.svg';
import { ReactComponent as CallIcon } from './Call.svg';
import { ReactComponent as MessageIcon } from './Message.svg';
import { ReactComponent as CalendarIcon } from './Calendar.svg';
import { ReactComponent as LocationIcon } from './Location.svg';
import { ReactComponent as FriendIcon } from './2User.svg';
import { ReactComponent as PasswordIcon } from './Password.svg';
import { ReactComponent as DocumentIcon } from './Document.svg';
import { ReactComponent as TimeIcon } from './TimeCircle.svg';
import { ReactComponent as InfoIcon } from './InfoSquare.svg';
import { ReactComponent as Spacer } from './Spacer.svg';
import { ReactComponent as ArrowIcon } from './Arrow.svg';

export const logo = <LogoIcon />;
export const profile = <ProfileIcon className='icon-fill' />;
export const name = <ProfileIcon className='icon-fill' />;
export const firstName = <ProfileIcon className='icon-fill' />;
export const lastName = <ProfileIcon className='icon-fill' />;
export const phone = <CallIcon className='icon-fill' />;
export const email = <MessageIcon className='icon-fill' />;
export const calendar = <CalendarIcon />;
export const dob = <CalendarIcon />;
export const location = <LocationIcon />;
export const address = <LocationIcon />;
export const friend = <FriendIcon className='icon-fill' />;
export const relation = <FriendIcon className='icon-fill' />;
export const emergency_contact = <FriendIcon className='icon-fill' />;
export const password = <PasswordIcon className='icon-fill' />;
export const confirmation = <PasswordIcon className='icon-fill' />;
export const currentPassword = <PasswordIcon className='icon-fill' />;
export const newPassword = <PasswordIcon className='icon-fill' />;
export const confirmNewPassword = <PasswordIcon className='icon-fill' />;
export const document = <DocumentIcon />;
export const insurance = <DocumentIcon />;
export const time = <TimeIcon />;
export const info = <InfoIcon />;

export const spacer = <Spacer />;

export const ArrowUp = ({ onClick }) => (
  <ArrowIcon className='icon deg270' onClick={onClick} />
);
export const ArrowRight = ({ onClick }) => (
  <ArrowIcon className='icon' onClick={onClick} />
);
export const ArrowDown = ({ onClick }) => (
  <ArrowIcon className='icon deg90' onClick={onClick} />
);
export const ArrowLeft = ({ onClick }) => (
  <ArrowIcon className='icon deg180' onClick={onClick} />
);
