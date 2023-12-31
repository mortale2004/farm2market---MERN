import { useRef, useEffect, useContext, useState } from "react";
import AlertContext from "../context/alert/AlertContext";
import ProgressContext from "../context/progressbar/ProgressContext";
import ReactStars from "react-stars";
import "./css/SellProcessedProduct.css";
import ProductContext from "../context/product/ProductContext";
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/login/LoginContext";


const UpdateProcessedProduct = () => {
    const a = useContext(AlertContext);
    const p = useContext(ProgressContext);
    const pr = useContext(ProductContext);
    const l = useContext(LoginContext);

    useEffect(() => {
        l.checkUser();
        // eslint-disable-next-line
    }, [l.authToken])

    const navigator = useNavigate();

    const [product, setProduct] = useState({ ...pr.product, rating: Number(pr.product.rating.$numberDecimal) });
    const [address, setAddress] = useState({ place: "", city: "", taluka: "", district: "", pincode: "" });


    const measurementRef = useRef();
    const categoryRef = useRef();


    const getAddress = async () => {
        const URL = `${process.env.REACT_APP_API_URL}address/${product.address}`;

        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "auth-token": JSON.parse(localStorage.getItem("auth-token"))
            },
        });

        const json = await response.json();
        setAddress(json.result[0]);
    }


    useEffect(() => {
        getAddress();
        measurementRef.current.selectedIndex = Array.from(measurementRef.current.options).findIndex((op) => op.value === product.measurement);
        categoryRef.current.selectedIndex = Array.from(categoryRef.current.options).findIndex((op) => op.value === product.category);
        // eslint-disable-next-line
    }, []);


    const updateAddress = async () => {

        const URL = `${process.env.REACT_APP_API_URL}address/${product.address}`;

        const response = await fetch(URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": JSON.parse(localStorage.getItem("auth-token"))
            },
            body: JSON.stringify(address)
        });

        p.setProgress(10);

        const json = await response.json();

        p.setProgress(25);

        if (json.status === "success") {
            a.setAlert({ status: "success", msg: ["पत्ता अद्यायावत केला आहे."], isDone: false })
        }
        else {
            a.setAlert({ status: "danger", msg: json.result, isDone: false })
        }

        p.setProgress(100);
        window.scroll({
            top: 0,
            behavior: "smooth",
        })

        return json?.result[0]?._id;
    }


    const handleSubmit = async (e) => {


        e.preventDefault();

        await updateAddress();

        const URL = `${process.env.REACT_APP_API_URL}products/${product._id}`;

        p.setProgress(40);

        try {

            const response = await fetch(URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": JSON.parse(localStorage.getItem("auth-token"))
                },
                body: JSON.stringify(product)
            });


            p.setProgress(65);

            const json = await response.json();

            if (json.status === "success") {
                a.setAlert({ status: "success", msg: ["शेतमालाचे यशस्वीरित्या अद्यतनित झाले..."], isDone: false })
                navigator("/yoursells");
            }
            else {
                a.setAlert({ status: "danger", msg: json.result, isDone: false })
            }

        } catch (error) {
            console.log(error);
        }
        p.setProgress(100);
    }


    const handleChange = (e) => {
        setProduct({ ...product, [e.currentTarget.name]: e.currentTarget.value })
    }

    const handleChangeAdd = (e) => {
        setAddress({ ...address, [e.currentTarget.name]: e.currentTarget.value })
    }

    const handleSelectChange = (e) => {
        setProduct({ ...product, [e.currentTarget.name]: e.currentTarget.options[e.currentTarget.selectedIndex].value })
    }

    const ratingChanged = (newRating) => {
        setProduct({ ...product, rating: newRating });
    };

    return (
        <main className="formMainCon">
            {a.showAlert()}
            <form onSubmit={handleSubmit}>
                <div className="formHeading">
                    <h1>शेतीतील प्रक्रिया केलेले उत्पादन अद्यतन फॉर्म</h1>
                </div>

                <h2>उत्पादनाची माहिती :</h2>
                <input required onChange={handleChange} value={product.title} type="text" name="title" id="title" placeholder="उत्पादनाचे नाव भरा" />
                <input required onChange={handleChange} value={product.price} type="number" name="price" id="price" placeholder="उत्पादनाची किंमत भरा" />

                <div className="inputCon">

                    <input required onChange={handleChange} value={product.quantity} type="number" name="quantity" id="quantity" placeholder="उत्पादनाचे प्रमाण भरा" />
                    <select name="measurement" required={true} onChange={handleSelectChange} className="select" ref={measurementRef}>
                        <option value="">उत्पादनाचे माप निवडा? </option>
                        <option value="किलो">किलो</option>
                        <option value="नग">नग</option>
                        <option value="लिटर">लिटर</option>
                    </select>
                </div>

                <select name="category" required={true} onChange={handleSelectChange} className="select" ref={categoryRef}>
                    <option value="">उत्पादनाचे प्रकार निवडा? </option>
                    <option value="सॉस">सॉस</option>
                    <option value="पावडर">पावडर</option>
                    <option value="रस">रस</option>
                    <option value="पापड">पापड</option>
                    <option value="त्वचा उत्पादने">त्वचा उत्पादने</option>
                    <option value="औषधे">औषधे</option>
                    <option value="कोरडे फळ">कोरडे फळ</option>
                    <option value="इतर">इतर</option>
                </select>

                <textarea required onChange={handleChange} value={product.description} type="text" name="description" id="description" placeholder="उत्पादनाचे वर्णन भरा" ></textarea>

                <p>रेटिंग निवडा:</p>
                <ReactStars
                    required
                    count={5}
                    size={24}
                    isHalf={true}
                    activeColor="#ffd700"
                    className="rating"
                    onChange={ratingChanged}
                    value={product.rating}
                />

                <br />
                <br />
                <h2>पत्ता:</h2>

                <input required onChange={handleChangeAdd} value={address.place} type="text" name="place" id="place" placeholder="ठिकाण भरा" />
                <input required onChange={handleChangeAdd} value={address.city} type="text" name="city" id="city" placeholder="गाव/शहर भरा" />
                <input required onChange={handleChangeAdd} value={address.taluka} type="text" name="taluka" id="taluka" placeholder="तालुका भरा" />
                <input required onChange={handleChangeAdd} value={address.district} type="text" name="district" id="district" placeholder="जिल्हा भरा" />
                <input required onChange={handleChangeAdd} value={address.pincode} type="number" name="pincode" id="pincode" placeholder="पिन कोड भरा" />

                <button>उत्पादन अद्यतन करा</button>
            </form>
        </main>
    )

}

export default UpdateProcessedProduct
