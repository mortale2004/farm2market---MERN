import tomato from "../utils/images/slider/tomato.jpg"
import ketchup from "../utils/images/slider/ketchup.jpg"
import juice from "../utils/images/slider/juice.jpg"
import vegetables from "../utils/images/slider/vegetables.jpg"
import 'react-awesome-slider/dist/styles.css';

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import "./css/Slider.css"
const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = () => {
    return (


        <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={1000}
      >
        <div data-src={tomato} />
        <div data-src={ketchup} />
        <div data-src={vegetables} />
        <div data-src={juice} />
      </AutoplaySlider>

    )
}

export default Slider;




 