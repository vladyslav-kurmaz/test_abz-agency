import React, { useEffect } from "react";

import { TWorkers } from "../../types/types";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxToolkidHooks";

import { fetchData, showMoreWorker } from "../../store/reducers/workerReducer";

import Worker from "../worker/worker";
import Spinner from "../spiner/spiner";

import "./workers.scss";

const Workers: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { workers, loading, count, disabled } = useAppSelector(
    (state) => state
  );

  useEffect(() => {
    dispatch(fetchData(count));
  }, [count]);

  const addWorkers = (data: TWorkers) => {
    if (data !== null) {
      const users = data.map((user) => {
        return <Worker key={user.id} info={user} />;
      });

      return users;
    }
  };

  const showMore = () => {
    dispatch(showMoreWorker());
  };

  return (
    <section className="workers " id="workers">
      <h2 className="workers__title">Working with GET request</h2>
      <ul className="workers__list"   >
        {loading && count < 7 ? <Spinner /> : addWorkers(workers)}
      </ul>
      
      {loading ? 
        <Spinner /> 
        : 
        <button
          className="addUser__form-submit"
          onClick={showMore}
          style={(disabled ? { display: "none" } : { display: "block" })}
          disabled={disabled}
        >
          Show more
        </button>
      }
    </section>
  );
};

export default Workers;
