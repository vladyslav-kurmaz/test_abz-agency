import React from 'react';
import { IWorker } from '../../types/types';

import './worker.scss';



const Worker: React.FC<{info: IWorker}> = ({info}: {info: IWorker}): JSX.Element => {
    const {id, photo, name, position, email, phone} = info;
    const cutName = name?.length > 30 ? `${name.slice(0, 30)}...` : name,
            cutPosition = position?.length > 30 ? `${position.slice(0, 30)}...` : position,
            cutEmail = email?.length > 30 ? `${email.slice(0,30)}...` : email;
    

    return (
        <li className="workers__item" key={id}>
            <img src={typeof photo === 'string' ? photo : ''} className='workers__item-photo' alt={name} />
            <h3 className='workers__item-name'>{cutName}</h3>
            <div className="workers__item-info">
                <p>{cutPosition}</p>
                <p>{cutEmail}</p>
                <p>{phone}</p>
            </div>

        </li>
    )
};

export default Worker;