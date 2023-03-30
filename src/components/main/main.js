import Button from '../button/button';


import mainBg from '../../images/main/main_background.webp'
import './main.scss'

const Main = () => {
    return (
        <section className='main' id='main'>
            <img src={mainBg} alt="" className='main__bg'/>
            <div className="main__container">
                
                <h2 className="main__container-title">
                    Test assignment for front-end developer
                </h2>
                <p className="main__container-text">
                    What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.    
                </p>

                <Button text='Sign up' link={'#singup'}/>
            </div>
            
        </section>
    )
}

export default Main;