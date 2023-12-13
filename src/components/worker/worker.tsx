import { useState, FC, MouseEvent, useEffect } from "react";
import { TWorker } from "../../types/types";

import "./worker.scss";

const Worker: FC<{ info: TWorker }> = ({ info }: { info: TWorker }) => {
  const [showMail, setShowMail] = useState(false);
  const { id, photo, name, position, email, phone } = info;
  const cutName = name?.length > 30 ? `${name.slice(0, 30)}...` : name;
  const cutPosition =
    position?.length > 30 ? `${position.slice(0, 30)}...` : position;
  const cutEmail = email?.length > 30 ? `${email.slice(0, 30)}...` : email;

  const showAllMail = () => {
    return email.length > 30 ? <span className="workers__item-mail-all">{email}</span> : null;
  };

  return (
    <li className="workers__item" key={id}>
      <img
        src={typeof photo === "string" ? photo : ""}
        className="workers__item-photo"
        alt={name}
      />
      <h3 className="workers__item-name">{cutName}</h3>
      <div className="workers__item-info">
        <p>{cutPosition}</p>
        <p
          className="workers__item-mail"
          onMouseEnter={() => {
            setShowMail(true);
          }}
          onMouseLeave={() => {
            setShowMail(false);
          }}
          style={{ position: "relative" }}
        >
          {showMail ? showAllMail() : null}
          {cutEmail}
        </p>
        <p>{phone}</p>
      </div>
    </li>
  );
};

export default Worker;
