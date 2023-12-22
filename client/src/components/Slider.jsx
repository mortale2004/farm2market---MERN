import tomato from "../utils/images/slider/tomato.jpg"
import ketchup from "../utils/images/slider/ketchup.jpg"
import juice1 from "../utils/images/slider/juice.jpg"
import vegetables from "../utils/images/slider/vegetables.jpg"
import vegetables2 from "../utils/images/slider/vegetables2.jpg"
import juice2 from "../utils/images/slider/juice2.jpeg";
import med1 from "../utils/images/slider/med1.jpg";
import sauce from "../utils/images/slider/sauce.jpg";
import grape from "../utils/images/slider/grape.jpg";
import papad2 from "../utils/images/slider/papad2.jpg";
import papad from "../utils/images/slider/papad.jpg";




import 'react-awesome-slider/dist/styles.css';

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import "./css/Slider.css"
const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = () => {

    const images = [tomato, ketchup, papad2, vegetables, juice1, vegetables2, juice2, med1, sauce, grape, papad];
    return (


        <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={1000}
      > 
      {images.map((img, i)=><div key={i} data-src={img} />)}
        
      </AutoplaySlider>

    )
}

export default Slider;




 