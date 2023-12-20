import { useContext, useEffect, useState } from "react";
import ProductContext from "../context/product/ProductContext";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import "./css/Product.css"
import { PhoneCall, Mail, Phone } from "lucide-react";
import ReactStars from 'react-stars';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Product = () => {

  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);

  const pr = useContext(ProductContext);
  const getUser = async () => {
    const URL = `${process.env.REACT_APP_API_URL}auth/users/${pr?.product?.userId}`;
    const response = await fetch(URL, {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("auth-token"))
      }
    });
    const json = await response.json();
    setUser(json.result);
  }

  const getAddress = async() => {
    const URL = `${process.env.REACT_APP_API_URL}auth/users/address/${pr?.product?.address}`;
    const response = await fetch(URL, {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("auth-token"))
      }
    });
    const json = await response.json();
    setAddress(json.result[0]);
    console.log(address, json.result);
  }


  useEffect(() => {
    if (pr.product) {
      getUser();
      getAddress();
    }
  }, []);




  if (pr.product) {
    return (
      <>
        <main className="productMainCon">
          <div className="productCon">
            <div className="slider">

              <AutoplaySlider
                play={true}
                cancelOnInteraction={false}
                interval={1000}
              >
                {pr.product.images.map(img => <div key={img} data-src={img} />)}
              </AutoplaySlider>
            </div>

            <div className="productDetails">
              <h1>{pr.product.title}</h1>
              <h3> ₹ {pr.product.price} / {pr.product.measurement}</h3>

              <ReactStars
                count={5}
                size={24}
                activeColor="#ffd700"
                edit={false}
                half={true}
                value={Number.parseFloat(pr.product.rating.$numberDecimal)} />

              <h5> उपलब्ध: {pr.product.quantity} {pr.product.measurement}</h5>
              <p>{pr.product.description}</p>

              <h3>पत्ता:</h3>
              <p>{address?.place}</p>
              <p>गाव: {address?.city}</p>
              <p>तालुका: {address?.taluka}</p>
              <p>जिल्हा: {address?.district}</p>
              <p>पिन कोड: {address?.pincode}</p>
            </div>
          </div>

        </main>
        <div className="contactContainer">
          <h1> <PhoneCall />संपर्क करा</h1>
          <h3>{user?.firstname.slice(0, 1).toUpperCase()}{user?.firstname.slice(1)} {user?.lastname.slice(0, 1).toUpperCase()}{user?.lastname.slice(1)}</h3>
          <p><a href={`mailto:${user?.email}`} className="emailA"><Mail /> &nbsp;   &nbsp;  &nbsp;  &nbsp;  &nbsp;{user?.email} </a></p>
          <p><a href={`tel:${user?.mobile}`} className="mobileA"> <Phone /> &nbsp;   &nbsp;  &nbsp;  &nbsp;  &nbsp;{user?.mobile} </a></p>
        </div>
      </>);
  }
  else {
    <>
    </>
  }
}

export default Product


