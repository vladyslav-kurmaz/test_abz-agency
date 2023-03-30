import Button from '../button/button'

import logo from '../../images/Logo.webp'

import './header.scss'

const Header = () => {
    return (
        <header className='header'>
            <div className='logo header__logo'>
                <a href="#main"><img src={logo} alt="main logo" /></a>
            </div>
            <div className='header__button-container'>
                <Button text='Users' link={'#workers'}/>
                <Button text='Sign up' link={'#singup'}/>
            </div>
            
        </header>
    )
}

export default Header;