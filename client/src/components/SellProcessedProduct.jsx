import { useContext, useState, useEffect } from "react";
import AlertContext from "../context/alert/AlertContext";
import ProgressContext from "../context/progressbar/ProgressContext";
import ReactStars from "react-stars";
import "./css/SellProcessedProduct.css";
import LoginContext from "../context/login/LoginContext";

const SellProcessedProduct = () => {
    const a = useContext(AlertContext);
    const p = useContext(ProgressContext);
    const l = useContext(LoginContext);

    const formData = new FormData();

    const [product, setProduct] = useState({ title: "", description: "", price: "", category: "", from: "industry", quantity: "", sold: 0, measurement: "", userId: "", rating: 0, address: "" });
    const [address, setAddress] = useState({ place: "", city: "", taluka: "", district: "", pincode: "" })

    useEffect(() => {
        l.checkUser();
        // eslint-disable-next-line
      }, [l.authToken])



    const storeAddress = async () => {

        const URL = `${process.env.REACT_APP_API_URL}address`;

        const response = await fetch(URL, {
            method: "POST",
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
            a.setAlert({ status: "success", msg: ["पत्ता जोडला."], isDone: false })
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

        const addressId = await storeAddress();

        Array.from(document.getElementsByName("image")).forEach(fileInp => {
            if (fileInp.files.length !== 0) {
                formData.append("image", fileInp.files[0]);
            }
        })

        formData.append("title", product.title);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("category", product.category);
        formData.append("from", product.from);
        formData.append("quantity", product.quantity);
        formData.append("sold", product.sold);
        formData.append("measurement", product.measurement);
        formData.append("rating", product.rating);
        formData.append("address", addressId);


        const URL = `${process.env.REACT_APP_API_URL}products`;

        p.setProgress(40);

        try {

            
            a.setAlert({ status: "success", msg: ["प्रतिमा अपलोड करत आहे..."], isDone: false })

            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "auth-token": JSON.parse(localStorage.getItem("auth-token"))
                },
                body: formData
            });


            p.setProgress(65);

            if (response.status===500)
            {
                a.setAlert({status:"danger", msg: ["कृपया लहान आकाराच्या प्रतिमा अपलोड करा"], isDone: false});
                return;
            }

            const json = await response.json();

            if (json.status === "success") {
                a.setAlert({ status: "success", msg: ["यशस्वीरित्या शेतमाल जोडला"], isDone: false })
                setProduct({ title: "", description: "", price: "", category: "", from: "farmer", quantity: "", sold: 0, measurement: "", userId: "", rating: 0, address: "" });
                setAddress({ place: "", city: "", taluka: "", district: "", pincode: "" });
                Array.from(document.getElementById("imgCon").getElementsByTagName("img")).forEach(img=>img.src="");
                const selects = Array.from(document.getElementsByClassName("select"));
                selects.forEach(select=>select.selectedIndex=0);
                Array.from(document.getElementsByClassName("fileInput")).forEach(file=>file.value=null);
            }
            else {
                a.setAlert({ status: "danger", msg: json.result, isDone: false })
                const URL = `${process.env.REACT_APP_API_URL}address/${addressId}`;
                await fetch(URL, {
                    method: "DELETE",
                    headers: {
                        "auth-token": JSON.parse(localStorage.getItem("auth-token"))
                    },
                });
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
                    <h1>शेतीतील प्रक्रिया केलेले उत्पादन जोडणी फॉर्म</h1>
                </div>

                <h2>उत्पादनाची माहिती :</h2>
                <input required onChange={handleChange} value={product.title} type="text" name="title" id="title" placeholder="उत्पादनाचे नाव भरा" />
                <input required onChange={handleChange} value={product.price} type="number" name="price" id="price" placeholder="उत्पादनाची किंमत भरा" />

                <div className="inputCon">

                    <input required onChange={handleChange} value={product.quantity} type="number" name="quantity" id="quantity" placeholder="उत्पादनाचे प्रमाण भरा" />
                    <select name="measurement" required={true} onChange={handleSelectChange} className="select" >
                        <option value="">उत्पादनाचे माप निवडा? </option>
                        <option value="किलो">किलो</option>
                        <option value="नग">नग</option>
                        <option value="लिटर">लिटर</option>
                    </select>
                </div>

                <select name="category" required={true} onChange={handleSelectChange} className="select">
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

                <br />
                <br />
                <h2>प्रतिमा अपलोड करा:</h2>

                <div className="inputCon">
                    <input onChange={(e) => document.getElementById("imgMain").src = URL.createObjectURL(e.currentTarget.files[0])} required type="file" name="image" accept="image/*" className="fileInput"/>
                    <input onChange={(e) => document.getElementById("secImg").src = URL.createObjectURL(e.currentTarget.files[0])} required type="file" name="image" accept="image/*" className="fileInput"/>
                    <input onChange={(e) => document.getElementById("optImg").src = URL.createObjectURL(e.currentTarget.files[0])} type="file" name="image" accept="image/*" className="fileInput"/>
                </div>

                <div id="imgCon">
                    <img src="" alt="मुख्य प्रतिमा" id="imgMain" />
                    <img src="" alt="दुसरी प्रतिमा" id="secImg" />
                    <img src="" alt="पर्यायी प्रतिमा" id="optImg" />
                </div>

                <button>उत्पादन जोडा</button>
            </form>
        </main>
    )

}

export default SellProcessedProduct
