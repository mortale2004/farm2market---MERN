import "./css/ProductGrid.css";
import { Trash, Edit, ShoppingCart } from "lucide-react";
import { useContext} from "react";
import ProductContext from "../context/product/ProductContext";
import { useNavigate } from "react-router-dom";
import ReactStars from 'react-stars';
import ProgressContext from "../context/progressbar/ProgressContext";



const ProductGrid = ({setConfirm, title, items, isBuy }) => {

    const pr = useContext(ProductContext);
    const p = useContext(ProgressContext);
    const navigator = useNavigate();


    const handleTrashClick = (e)=>{
        setConfirm({active: true, id: e.currentTarget.parentElement.id});
    }   


    const handleClick = (e, item) => {
        pr.setProduct(item);
        navigator("/product");
    }

    const handleEditClick = async (e)=>{
        p.setProgress(30);
        const URL = `${process.env.REACT_APP_API_URL}products/${e.currentTarget.parentElement.id}`;
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "auth-token": JSON.parse(localStorage.getItem("auth-token")),
            }
        });
        p.setProgress(80);
        const json = await response.json();
        if (json.result[0].from==="industry")
        {
            pr.setProduct(json.result[0]);
            navigator("/updateprocessedproduct");
            
        }
        else if (json.result[0].from==="farmer")
        {
            pr.setProduct(json.result[0]);
            navigator("/updatefarmproduct");
        }
        p.setProgress(100);
    }

    return (
        <>

            <section className="product-slider">
                <div className="headingContainer">
                    <h1>{title}</h1>
                </div>
                
                <div className="gridContainer" >
                    {items.map((item, i) => <div className="slide"  key={item._id} >
                        <img src={item.images[0]} alt={item.title} />


                        {!isBuy?
                        <div className="textCon">
                            <h3>{item.title}</h3>
                            <h4> <span>₹ {item.price} / {item.measurement} </span> <span>उपलब्ध: {item.quantity} {item.measurement} </span></h4>
                            
                            <div className="buySell" id={item._id}>
                            <ReactStars
                                    count={5}
                                    size={24}
                                    activeColor="#ffd700"
                                    edit={false}
                                    half={true}
                            value={Number.parseFloat(item.rating.$numberDecimal)} />

                                <Edit className="editBtn" onClick={handleEditClick}/>
                                <Trash className="trashBtn" onClick={handleTrashClick}/>
                            </div>

                        </div>
                            :

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
                    }




                    </div>)}

                </div>
            </section>
        </>
    );
}

export default ProductGrid;