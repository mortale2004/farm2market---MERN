import "./css/ProductSlider.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
const ProductSlider = ({ title, items }) => {

    const sliderRef = useRef();

    const handlePrev = () => {
        sliderRef.current.scrollLeft -=  245;
    }
    
    const handleNext = () => {
        sliderRef.current.scrollLeft +=  245;
    }

    return (
        <>

            <section className="product-slider">
                <div className="headingContainer">
                    <h1>{title}</h1>
                    <div className="buttonsCon">
                        <ChevronLeft onClick={handlePrev}/>
                        <ChevronRight onClick={handleNext}/>
                    </div>
                </div>
                <div className="sliderContainer" ref={sliderRef}>

                    {items.map((item, i)=>  <div className="slide" id={item._id} key={item._id}>
                        <img src={item.images[0]} alt={item.title} />
                        <div className="textCon">
                            <h3>{item.title}</h3>
                            <h4> ₹ {item.price} / किलो</h4>
                            <div className="buySell">
                                <span>खरेदी करा</span>
                                <span>विक्री करा</span>
                            </div>
                        </div>
                    </div>)}

                </div>                
            </section>

        </>
    );  
}

export default ProductSlider;