import React, { useState } from 'react';
import { Header } from '../../components';
import { ArrowDown, ArrowUp } from '../../icons/';
import { FAQS } from '../../tools/info/FAQS';

const Faq = () => {
  return (
    <div id='faq' className='page transition show'>
      <Header header='COVID-19 testing information' />
      <FaqList />
    </div>
  );
};

export default Faq;

const FaqList = () => {
  return (
    <div className='items flex-col'>
      {FAQS.map((item, i) => {
        return <FaqItem key={`info-${i}`} item={item} />;
      })}
    </div>
  );
};

const FaqItem = ({ item }) => {
  const [showInfo, setShowInfo] = useState(false);

  const { question, answer } = item;

  const handleIconClick = (e) => {
    e.stopPropagation();
    setShowInfo(!showInfo);
  };

  const arrowIcon = showInfo ? <ArrowUp /> : <ArrowDown />;
  return (
    <div className='flex-col type' onClick={handleIconClick}>
      <h2>{question}</h2>
      <hr className='v-hidden' />
      <div className='flex-row more'>{arrowIcon}</div>
      <ul className={showInfo ? 'show-info' : 'no-info'}>
        {answer.map((item, index) => {
          return (
            <li key={'info' + index} className='small'>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
