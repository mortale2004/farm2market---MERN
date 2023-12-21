import "./css/ProductSlider.css";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useContext, useRef } from "react";
import ProductContext from "../context/product/ProductContext";
import { useNavigate } from "react-router-dom";
import ReactStars from 'react-stars';


const ProductSlider = ({ title, items }) => {

    const pr = useContext(ProductContext);
    const sliderRef = useRef();

    const navigator = useNavigate();

    const handlePrev = () => {
        sliderRef.current.scrollLeft -= 245;
    }

    const handleNext = () => {
        sliderRef.current.scrollLeft += 245;
    }

    const handleClick = (e, item) => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
        pr.setProduct(item);
        navigator("/product");
    }


    return (
        <>

            <section className="product-slider">
                <div className="headingContainer">
                    <h1>{title}</h1>
                    <div className="buttonsCon">
                        <ChevronLeft onClick={handlePrev} />
                        <ChevronRight onClick={handleNext} />
                    </div>
                </div>
                <div className="sliderContainer" ref={sliderRef}>

                    {items.map((item, i) => <div className="slide" id={item._id} key={item._id}>
                        <img src={item.images[0]} alt={item.title} />
                        <div className="textCon">
                            <h3>{item.title}</h3>
                            <h4> ₹ {item.price} / किलो</h4>
                            
                            
                            <div className="buySell" onClick={(e) => handleClick(e, item)}>
                            <ReactStars
                                    count={5}
                                    size={24}
                                    activeColor="#ffd700"
                                    edit={false}
                                    half={true}
                            value={Number.parseFloat(item.rating.$numberDecimal)} />
                                <span className="shopButton">खरेदी करा <ShoppingCart/> </span>
                            </div>
                        </div>
                    </div>)}

                </div>
            </section>
        </>
    );
}

export default ProductSlider;