import './spiner.scss';

const Spinner = () => {
    return (
        <div className="spiner">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 2.4C24 1.07452 25.0772 -0.0124356 26.3961 0.119892C30.2962 0.511212 34.0543 1.85353 37.3337 4.04473C41.2805 6.68189 44.3566 10.4302 46.1731 14.8156C47.9896 19.201 48.4649 24.0266 47.5388 28.6822C46.6128 33.3377 44.327 37.6141 40.9706 40.9706C37.6141 44.327 33.3377 46.6128 28.6822 47.5388C24.0266 48.4649 19.201 47.9896 14.8156 46.1731C10.4302 44.3566 6.68188 41.2805 4.04473 37.3337C1.85353 34.0543 0.511211 30.2963 0.119892 26.3961C-0.0124351 25.0772 1.07452 24 2.4 24C3.72548 24 4.78454 25.0787 4.9498 26.3938C5.32038 29.343 6.37231 32.1774 8.03578 34.6669C10.1455 37.8244 13.1441 40.2853 16.6525 41.7385C20.1608 43.1917 24.0213 43.5719 27.7457 42.8311C31.4702 42.0902 34.8913 40.2616 37.5765 37.5765C40.2616 34.8913 42.0902 31.4702 42.8311 27.7457C43.5719 24.0213 43.1917 20.1608 41.7385 16.6525C40.2853 13.1441 37.8244 10.1455 34.667 8.03578C32.1774 6.37231 29.343 5.32039 26.3938 4.9498C25.0787 4.78454 24 3.72548 24 2.4Z" fill="#00BDD3"/>
            </svg>
        </div>
        
        // <svg xmlns="http://www.w3.org/2000/svg" style={{margin: '0 auto', background: 'none', display: 'block'}} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        //     <g transform="translate(80,50)">
        //     <g transform="rotate(0)">
        //     <circle cx="0" cy="0" r="7" fill="#ffff00" fillOpacity="1">
        //     <animateTransform attributeName="transform" type="scale" begin="-0.875s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        //     <animate attributeName="fillOpacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.875s"></animate>
        //     </circle>
        //     </g>
        //     </g><g transform="translate(71.21320343559643,71.21320343559643)">
        //     <g transform="rotate(45)">
        //     <circle cx="0" cy="0" r="7" fill="#ffff00" fillOpacity="0.875">
        //     <animateTransform attributeName="transform" type="scale" begin="-0.75s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        //     <animate attributeName="fillOpacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.75s"></animate>
        //     </circle>
        //     </g>
        //     </g><g transform="translate(50,80)">
        //     <g transform="rotate(90)">
        //     <circle cx="0" cy="0" r="7" fill="#ffff00" fillOpacity="0.75">
        //     <animateTransform attributeName="transform" type="scale" begin="-0.625s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        //     <animate attributeName="fillOpacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.625s"></animate>
        //     </circle>
        //     </g>
        //     </g><g transform="translate(28.786796564403577,71.21320343559643)">
        //     <g transform="rotate(135)">
        //     <circle cx="0" cy="0" r="7" fill="#ffff00" fillOpacity="0.625">
        //     <animateTransform attributeName="transform" type="scale" begin="-0.5s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        //     <animate attributeName="fillOpacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.5s"></animate>
        //     </circle>
        //     </g>
        //     </g><g transform="translate(20,50.00000000000001)">
        //     <g transform="rotate(180)">
        //     <circle cx="0" cy="0" r="7" fill="#ffff00" fillOpacity="0.5">
        //     <animateTransform attributeName="transform" type="scale" begin="-0.375s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        //     <animate attributeName="fillOpacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.375s"></animate>
        //     </circle>
        //     </g>
        //     </g><g transform="translate(28.78679656440357,28.786796564403577)">
        //     <g transform="rotate(225)">
        //     <circle cx="0" cy="0" r="7" fill="#ffff00" fillOpacity="0.375">
        //     <animateTransform attributeName="transform" type="scale" begin="-0.25s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        //     <animate attributeName="fillOpacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.25s"></animate>
        //     </circle>
        //     </g>
        //     </g><g transform="translate(49.99999999999999,20)">
        //     <g transform="rotate(270)">
        //     <circle cx="0" cy="0" r="7" fill="#ffff00" fillOpacity="0.25">
        //     <animateTransform attributeName="transform" type="scale" begin="-0.125s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        //     <animate attributeName="fillOpacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.125s"></animate>
        //     </circle>
        //     </g>
        //     </g><g transform="translate(71.21320343559643,28.78679656440357)">
        //     <g transform="rotate(315)">
        //     <circle cx="0" cy="0" r="7" fill="#ffff00" fillOpacity="0.125">
        //     <animateTransform attributeName="transform" type="scale" begin="0s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        //     <animate attributeName="fillOpacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="0s"></animate>
        //     </circle>
        //     </g>
        //     </g>
        // </svg>
    )
}

export default Spinner;