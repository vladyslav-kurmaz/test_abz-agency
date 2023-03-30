import successMes from '../../images/success_mes/success-image.webp';

import './formMessage.scss';

const FormMessage = () => {
    return (
        <section className='form-message'>
            <h2>User successfully registered</h2>
            <img src={successMes} alt="Success Message"/>
        </section>
    )
}

export default FormMessage;