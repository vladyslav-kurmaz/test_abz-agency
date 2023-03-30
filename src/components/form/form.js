import { useState, useEffect } from 'react';
import Service from '../../service/service';
import Spinner from '../spiner/spiner';
import FormMessage from '../formMessage/formMessage';

import './form.scss';

const Form = () => {
    const [positions, setPositions] = useState(''),
            [name, setName] = useState(''),
            [email, setEmail] = useState(''),
            [phone, setPhone] = useState(''),
            [position, setPosition] = useState(''),
            [photo, setPhoto] = useState('Upload your photo'),
            [success, setSuccess] = useState(false),
            [disabled, setDisabled] = useState(false);

    const nameRegexr = /^.{3,59}$/,
        emailRegexr = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        phoneRegexr = /^[\+]{0,1}380([0-9]{9})$/;


    const postUser = new Service();

    useEffect(() => {
        postUser.getPosition()
            .then(res => setPositions(res.positions))
    }, [])

    const validate = (reg, value) => {
        return value.match(reg) 
    }

    const onSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        setDisabled(true)


        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('position_id', position);
        formData.append('photo', photo);

        postUser.postUser(formData)
            .then(res => res.success ? setSuccess(true) : null)
            .then(res => setTimeout(() => {
                setSuccess(false)
                setDisabled(false)
            }, 4000))
            .then(res => postUser.getPosition()
            .then(res => setPositions(res.positions)))
            .catch(error => console.error(error))
            .finally(reg => {
                setName('');
                setEmail('');
                setPhone('');
                setPosition('');
                setPhoto('');
            });     
    }

    const changeInput = (e, setValue, reg) => {

        if (validate(reg, e.target.value) === null) {
            e.target.style.border = '1px solid red';
        } else {
            e.target.style.border = ''
        }

        if (setValue === setPhoto) {
            if (e.target.files[0].size > 5000000) {
                e.target.parentElement.style.border = '1px solid red';
            } else {
                e.target.parentElement.style.border = '2px solid green'
            }
            setValue(e.target.files[0]);
        } else {
            setValue(e.target.value);
        }
    }

    const render = () => {
        return (
            <form className='form addUser__form' 
                    onSubmit={onSubmit}
                    id='singup'>
                <div className='addUser__form-user'>
                    <input className='addUser__form-info' 
                            onChange={(e) => changeInput(e, setName, nameRegexr)} 
                            // pattern={nameRegexr}
                            value={name} 
                            name='name' 
                            type="text" 
                            required 
                            placeholder='Your name'/>
                    <input className='addUser__form-info' 
                            onChange={(e) => changeInput(e, setEmail, emailRegexr)} 
                            value={email} 
                            // pattern={emailRegexr} 
                            name='email' 
                            type="email" 
                            required 
                            placeholder='Email'/>
                    <label htmlFor="phone">
                        <input className='addUser__form-info' 
                                onChange={(e) => changeInput(e, setPhone, phoneRegexr)} 
                                value={phone} 
                                // pattern={phoneRegexr} 
                                name='phone' 
                                type="tel" 
                                id='phone' 
                                required 
                                placeholder='Phone'/>
                        +38 (XXX) XXX - XX - XX
                    </label>
                </div>
                
                <div className='addUser__form-position'>
                    <span className='addUser__form-position-title'>Select your position</span>

                    {!positions ? <Spinner/> : positions.map(item => {
                        return (
                            <label htmlFor={item.id} key={item.id}>
                                <input type="radio" 
                                        id={item.id} 
                                        required 
                                        name='position_id' 
                                        onChange={(e) => changeInput(e, setPosition)} 
                                        value={item.id} />
                                {item.name}
                            </label>
                        )
                    })}

                    <label htmlFor="addPhoto" className='addUser__form-position-file'>
                        <input type="file"  
                                name='photo' 
                                onChange={(e) => changeInput(e, setPhoto)} 
                                required 
                                accept='.jpg, .jpeg' 
                                id='addPhoto'/>
                        <label className='button__file' htmlFor='addPhoto'>Upload</label>
                        {typeof(photo) === 'string' ? photo :  photo.name.slice(0, 25)}
                    </label> 
                </div>

                <button className='addUser__form-submit'>Sing up</button>
            </form>
        )
    }

    return (
        
        <section className='addUser reveal'>
            <h2 className='addUser__title'>Working with POST request</h2>
            {success ? <FormMessage/> : render()}
        </section>
    )
};

export default Form;