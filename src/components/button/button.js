import './button.scss';

const Button = ({text, onClick, disabled, link, teg}) => {
    return (
        <a href={link} 
            onClick={onClick} 
            className='button'
            disabled={disabled}>{text}</a>
    )
}

export default Button