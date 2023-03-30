import './button.scss';

const Button = ({text, onClick, disabled, link}) => {
    return (
        <a href={link} 
            onClick={onClick} 
            className='button'
            disabled={disabled}>{text}</a>
    )
}

export default Button