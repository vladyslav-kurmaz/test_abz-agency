import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEventHandler,
  FormEvent,
} from "react";

import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../store/store";

import Service from "../../service/service";
import Spinner from "../spiner/spiner";
import FormMessage from "../formMessage/formMessage";
import { useAppSelector } from "../../hooks/reduxToolkidHooks";
import {
  fetchPosition,
  fetchData,
  changeSuccess,
  changeStatusError409,
} from "../../store/reducers/workerReducer";
import { TPosition, TStatusInfo, TWorker } from "../../types/types";
import { useDispatch } from "react-redux";

import "./form.scss";
import Input from "../Input/Input";
import validationForm from "../../utils/validationForm";

const Form: React.FC = (): JSX.Element => {
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  const [disable, setDisable] = useState(true);
  const [statusInfo, setStatusInfo] = useState<TStatusInfo>({
    name: false,
    email: false,
    phone: false,
    position: false,
    positions_id: false,
    photo: false,
  });

  const { position, success, error409 } = useAppSelector((state) => state);

  const [newUser, setNewUser] = useState<TWorker>({
    name: "",
    email: "",
    phone: "",
    position: "",
    positions_id: "",
    photo: "Upload your photo",
  });

  const { postUser } = Service();

  useEffect(() => {
    dispatch(fetchPosition());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      statusInfo.name &&
      statusInfo.email &&
      statusInfo.phone &&
      statusInfo.photo
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }

    // eslint-disable-next-line
  }, [newUser.name, newUser.email, newUser.phone, newUser.photo]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(changeStatusError409(false));
    const formData = new FormData();
    formData.append("name", newUser.name);
    formData.append("email", newUser.email);
    formData.append("phone", newUser.phone);
    formData.append("position_id", newUser.positions_id);
    formData.append("photo", newUser.photo);

    try {
      // eslint-disable-next-line
      const userPost = await postUser(formData);

      dispatch(fetchData(6));
      dispatch(changeSuccess(true));

      setTimeout(() => {
        dispatch(changeSuccess(false));
      }, 4000);
    } catch (e) {
      dispatch(changeStatusError409(true));
    }

    setNewUser(() => ({
      name: "",
      email: "",
      phone: "",
      position: "",
      positions_id: "",
      photo: "Upload your photo",
    }));

    setStatusInfo(() => ({
      name: false,
      email: false,
      phone: false,
      position: false,
      positions_id: false,
      photo: false,
    }));
  };

  const updateNewUserInfo = (e: ChangeEvent<HTMLInputElement>): void => {
    switch (e.target.getAttribute("name")) {
      case "position_id":
        const positioContent = e.target.parentElement?.textContent;
        setNewUser((): TWorker => {
          return {
            ...newUser,
            positions_id: e.target.getAttribute("id") + "",
            position: positioContent ? positioContent : "",
          };
        });
        break;
      case "photo":
        const files = e.target.files;

        if (
          e.target.getAttribute("type") === "file" &&
          files &&
          files[0].size < 5000000
        ) {
          setStatusInfo((state) => ({ ...state, photo: true }));
          setNewUser((): TWorker => {
            return {
              ...newUser,
              photo: files[0],
            };
          });
          return;
        } else {
          setStatusInfo((state) => ({ ...state, photo: false }));
          if (
            e.target.getAttribute("type") === "file" &&
            files &&
            files[0].size > 5000000
          ) {
            setNewUser((): TWorker => {
              return {
                ...newUser,
                photo: files[0].name,
              };
            });
          } else {
            setNewUser((): TWorker => {
              return {
                ...newUser,
                photo: "",
              };
            });
          }
        }
        break;
    }
  };

  const render = () => {
    return (
      <form className="form addUser__form" onSubmit={onSubmit} id="singup">
        <div className="addUser__form-user">
          <Input
            value={newUser.name}
            name="name"
            handler={(e) =>
              setNewUser((state) => ({ ...state, name: e.target.value }))
            }
            status={setStatusInfo}
            label={"Your name"}
            id="form__name"
          />

          <Input
            value={newUser.email}
            name="email"
            handler={(e) =>
              setNewUser((state) => ({ ...state, email: e.target.value }))
            }
            status={setStatusInfo}
            label={"Email"}
            id="form__email"
          />

          <Input
            value={newUser.phone}
            name="phone"
            handler={(e) =>
              setNewUser((state) => ({ ...state, phone: e.target.value }))
            }
            status={setStatusInfo}
            label={"Phone"}
            id="form__phone"
          />
        </div>

        <div className="addUser__form-position">
          <span className="addUser__form-position-title">
            Select your position
          </span>

          {!position ? (
            <Spinner />
          ) : (
            position.map(({ id, name }: TPosition) => {
              return (
                <label htmlFor={id + ""} key={id}>
                  <input
                    type="radio"
                    id={id + ""}
                    name="position_id"
                    onChange={updateNewUserInfo}
                    value={newUser.positions_id}
                    checked={newUser.positions_id === id + ""}
                  />
                  {name}
                </label>
              );
            })
          )}

          <div className="addUser__form-user-container">
            <label
              htmlFor="addPhoto"
              className="addUser__form-position-file"
              style={
                validationForm(newUser.photo, "file")?.errorStatus
                  ? { border: "1px solid red" }
                  : {}
              }
            >
              <input
                value={newUser.photo ? "" : undefined}
                type="file"
                name="photo"
                onChange={updateNewUserInfo}
                accept=".jpg, .jpeg"
                id="addPhoto"
              />
              <label
                className="button__file"
                htmlFor="addPhoto"
                style={
                  validationForm(newUser.photo, "file")?.errorStatus
                    ? { border: "1px solid red" }
                    : {}
                }
              >
                Upload
              </label>
              {typeof newUser.photo === "string"
                ? newUser.photo
                : `${newUser.photo?.name.slice(0, 25)}...`}
            </label>
            {validationForm(newUser.photo, "file")?.errorStatus ? (
              <div className="addUser__form-user-container-input-error">
                {validationForm(newUser.photo, "file")?.message}
              </div>
            ) : null}
          </div>
        </div>
        {error409 ? (
          <div className="form__error">
            User with this phone or email already exist
          </div>
        ) : null}

        <button className="addUser__form-submit" disabled={disable}>
          Sing up
        </button>
      </form>
    );
  };

  return (
    <section className="addUser">
      <h2 className="addUser__title">Working with POST request</h2>
      {success ? <FormMessage /> : render()}
    </section>
  );
};

export default Form;
