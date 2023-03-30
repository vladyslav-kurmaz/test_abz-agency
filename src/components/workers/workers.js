import { useState, useEffect } from 'react';

import Button from '../button/button';
import Worker from '../worker/worker';
import Service from '../../service/service';
import Spinner from '../spiner/spiner';

import './workers.scss';

const Workers = () => {
    const [data, setData] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [count, setCount] = useState(6);
    const [page, setPage] = useState(1);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        onRequest();
    }, [])

    useEffect(() => {
        setWorkers(data.users);

        setDisabled(() => count >= data.total_users ? true : false);
    }, [data])

    useEffect(() => {
        onRequest(page, count);
    }, [count])

    const user = new Service();

    const onRequest = (page, count) => {
        user
            .getUsers(page, count)
            .then(res => setData(res))
    }


    const addWorkers = (data) => {
        const users = data.map(user => {
            return <Worker key={user.id} info={user}/>
        })

        return users
    }

    const showMore = () => {
        setCount(count => count + 6);
    }

    return (
        <section className='workers reveal' id='workers'>
            <h2 className='workers__title'>
                Working with GET request
            </h2>
            <ul className='workers__list'>
                {!workers ? <Spinner/> : addWorkers(workers)}
            </ul>
            <Button text='Show more'
                onClick={showMore}
                disabled={disabled}/>

        </section>
    )
};

export default Workers;