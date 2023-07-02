import React, { useState, useEffect, ChangeEvent, FormEventHandler, FormEvent } from 'react';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../store/store';

import Service from '../../service/service';
import Spinner from '../spiner/spiner';
import FormMessage from '../formMessage/formMessage';
import { fetchPosition, fetchData, changeSuccess, changeStatusError409 } from '../../store/reducers/workerReducer';
import { IInitialState, IPosition, IWorker } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';

import './form.scss';

const Form: React.FC = (): JSX.Element => {

    const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

    const {position, success, error409} = useSelector((state: IInitialState) => state)
    const [newUser, setNewUser] = useState<IWorker>({
        name: '',
        email: '',
        phone: '',
        position: '',
        positions_id: '',
        photo: 'Upload your photo'
    })  

    const nameRegexr = /^.{2,60}$/,
        emailRegexr = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        phoneRegexr = /^[/+]{0,1}380([0-9]{9})$/;


    const {postUser} = Service();

    useEffect(() => {
        dispatch(fetchPosition())
        // eslint-disable-next-line
    }, [])

    const validate = (reg: RegExp, value: string): null | RegExpMatchArray => {
        return value.trim().match(reg)
    }

    const validateAllNewUser = (newUser: IWorker): boolean  => {
        let result: boolean = false ;
        
        for (let key in newUser) {
            const keyNewUser = newUser[key as keyof IWorker]
            if (!keyNewUser || (keyNewUser && keyNewUser) === 'Upload your photo') {
                result = false;
                break;
            } else {
                result = true
            }
        }      
        return result
    }

    const validateFile = (value: File | string): boolean  => {
        
        let result: boolean = false
        if (value === '') {
            result = true;
        } else if (typeof value === 'string') {
            result = false
        } else {
            result = value.size > 5000000 ? true : false;
        }
        
        return result
        
    }   

    const onSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newUser.name);
        formData.append('email', newUser.email);
        formData.append('phone', newUser.phone);
        formData.append('position_id', newUser.positions_id);
        formData.append('photo', newUser.photo);
                    

        postUser(formData)
            .then(res => {
                if (res === 409) {
                    dispatch(changeStatusError409(true))
                } else {
                    dispatch(changeStatusError409(false))
                    return res
                }
            })
            .then(res => {
                dispatch(fetchData(6))
                return res.success ? dispatch(changeSuccess(true)) : null
                 
            })
            .then(res => setTimeout(() => {
                
                dispatch(changeSuccess(false))
            }, 4000))
            .catch(error => console.error(error))
            .finally(() => {
                setNewUser(() => ({
                    name: '',
                    email: '',
                    phone: '',
                    position: '',
                    positions_id: '',
                    photo: 'Upload your photo'
                }))
            });     
       
    }

    const updateNewUserInfo = (e: ChangeEvent<HTMLInputElement>): void => {
            switch(e.target.getAttribute('name')) {
                case 'name':
                    setNewUser((): IWorker => {
                        return {
                            ...newUser,
                            name: e.target.value
                        }
                    });
                    break;
                case 'email':                
                    setNewUser((): IWorker => {
                            return {
                                ...newUser,
                                email: e.target.value
                        }
                    });
                    break;
                case 'phone':
                    setNewUser((): IWorker => {
                        return {
                            ...newUser,
                            phone: e.target.value
                            }
                    });
                    break;
                case 'position_id':    
                    const positioContent = e.target.parentElement?.textContent
                    setNewUser((): IWorker => {
                        return {
                            ...newUser,
                            positions_id: e.target.getAttribute('id') + '',
                            position: positioContent ? positioContent : ''
                        }
                    });
                    break;
                case 'photo':
                    const files = e.target.files
                    console.log(e.target.getAttribute('type'));
                    console.log(files);
                    
                    
                    if (e.target.getAttribute('type') === 'file' && files  && files[0].size < 5000000) {                                                
                        setNewUser((): IWorker => {
                            return {
                                ...newUser,
                                photo: files[0]
                            }
                        });
                        
                    } else {
                        setNewUser((): IWorker => {
                            return {
                                ...newUser,
                                photo: ''
                            }
                        });
                    }
                    break;
            }
    }

    const validateName = validate(nameRegexr, newUser.name) === null && newUser.name.length > 0
    const validateEmail = validate(emailRegexr, newUser.email) === null && newUser.email.length > 0
    const validatePhone = validate(phoneRegexr, newUser.phone) === null && newUser.phone.length > 0 
    const validatePhoto = validateFile(newUser.photo);

    const render = () => {
        return (
            <form className='form addUser__form' 
                    onSubmit={onSubmit}
                    id='singup'>
                <div className='addUser__form-user'>
                    <div className='addUser__form-user-container'>
                        <input className='addUser__form-user-container-info' 
                                onChange={updateNewUserInfo} 
                                value={newUser.name} 
                                style={validateName ? {'border': '1px solid red'} : {} }
                                name='name' 
                                type="text" 
                                placeholder='Your name'/>
                        {validateName ? 
                            <div className='addUser__form-user-container-input-error'>Name must be 2 - 60 symbol</div> : null}
                    </div>
                    
                    <div className='addUser__form-user-container'>
                    
                        <input className='addUser__form-user-container-info' 
                                onChange={updateNewUserInfo}
                                style={validateEmail ? {'border': '1px solid red'} : {} }
                                value={newUser.email} 
                                name='email' 
                                type="email" 
                                placeholder='Email'/>
                                
                        {validateEmail ? 
                            <div className='addUser__form-user-container-input-error'>Email must be aaa@gmail.com</div> : null}
                    </div>
                    <div className='addUser__form-user-container'>
                        <input className='addUser__form-user-container-info' 
                                onChange={updateNewUserInfo}
                                value={newUser.phone} 
                                style={validatePhone ? {'border': '1px solid red'} : {} }
                                name='phone' 
                                type="tel" 
                                id='phone' 
                                placeholder='Phone'/>
                        {validatePhone ? 
                            <div className='addUser__form-user-container-input-error'>Phone must be +38 (XXX) XXX - XX - XX</div> : null}
                    </div>
                </div>
                
                <div className='addUser__form-position'>
                    <span className='addUser__form-position-title'>Select your position</span>

                    {!position ? <Spinner/> : position.map(({id, name}: IPosition) => {
                        return (
                            <label htmlFor={id + ''} key={id}>
                                <input type="radio" 
                                        id={id + ''} 
                                        name='position_id' 
                                        onChange={updateNewUserInfo}
                                        value={newUser.positions_id} 
                                        checked={newUser.positions_id === id + ''}/>
                                {name}
                            </label>
                        )
                    })}

                    <div className='addUser__form-user-container'>
                        <label 
                            htmlFor="addPhoto"
                            className='addUser__form-position-file'
                            style={validatePhoto ? {'border': '1px solid red'} : {}}>
                                <input 
                                    value={newUser.photo ? '' : undefined}
                                    type="file"  
                                    name='photo' 
                                    onChange={updateNewUserInfo}
                                    accept='.jpg, .jpeg' 
                                    id='addPhoto'/>
                                <label 
                                    className='button__file' 
                                    htmlFor='addPhoto'
                                    style={validatePhoto ? {'border': '1px solid red'} : {}}>Upload</label>
                                {typeof(newUser.photo) === 'string' ? newUser.photo : `${newUser.photo?.name.slice(0, 25)}...`}
                        </label> 
                        {validatePhoto ? 
                                <div className='addUser__form-user-container-input-error'>No more 5mg and only .jpg, .jpeg</div> : null}
                    </div>
                </div>
                {error409 ? <div className='form__error'>User with this phone or email already exist</div> : null}
                <button className='addUser__form-submit' disabled={validateAllNewUser(newUser) ? false : true}>Sing up</button>
            </form>
        )
    }

    return (
        
        <section className='addUser'>
            <h2 className='addUser__title'>Working with POST request</h2>
            {success ? <FormMessage/> : render()}
        </section>
    )
};

export default Form;