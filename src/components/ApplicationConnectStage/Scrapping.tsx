import React from 'react';
import { BallTriangle } from 'react-loading-icons';

export function Scrapping({ title = '', isPending = true }) {
  return (
    <div className={isPending ? 'block' : 'hidden'}>
      {title && <h3 className='font-bold text-lg text-center'>{title}</h3>}

      <BallTriangle stroke="#d827a9" style={{
        margin: '3rem auto 2rem',
      }} />
    </div>
  )
}
