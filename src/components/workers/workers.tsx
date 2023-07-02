import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WorkersType } from '../../types/types';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../store/store';

import { IInitialState } from '../../types/types';
import { fetchData, showMoreWorker } from '../../store/reducers/workerReducer';

import Worker from '../worker/worker';
import Spinner from '../spiner/spiner';

import './workers.scss';

const Workers: React.FC = (): JSX.Element => {

  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();  

  const {workers, loading, count, disabled } = useSelector((state: IInitialState) => ({
    workers: state.workers,
    loading: state.loading,
    count: state.count,
    disabled: state.disabled
  }))


  useEffect(() => {
    dispatch(fetchData(count));
    // eslint-disable-next-line
  }, [count])

  const addWorkers = (data: WorkersType) => {
    if (data !== null) {
      const users = data.map(user => {
        return <Worker key={user.id} info={user}/>
      })
  
      return users
    }
  }

  const showMore = () => {
    dispatch(showMoreWorker());
  }

  return (
    <section className='workers ' id='workers'>
      <h2 className='workers__title'>
        Working with GET request
      </h2>
      <ul className='workers__list'>
        {loading ? <Spinner/> : addWorkers(workers)}
      </ul>
      <button 
        className='addUser__form-submit'
        onClick={showMore}
        disabled={disabled}>Show more</button>
    </section>
  )
};

export default Workers;