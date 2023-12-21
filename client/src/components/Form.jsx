import React, { useState } from 'react'

const Form = () => {

    const [user, setUser] = useState({ email: "", mobile: "" });

    const handleSubmit = (e) => {
        const config = {
            SecureToken : process.env.REACT_APP_EMAIL_TOKEN,
            To: user.email,
            From: "sheti.te.bajar.official@gmail.com",
            Subject: `Hello there this is my mobile number ${user?.mobile}`,
            Body: "lifjsdfjdsfjdskfjsdklfjsklfjdsklfjkl"
        }

        e.preventDefault();
        if (window.Email) {
            window.Email.send(config).then((message) => alert(`Email Sent Succussfully. ${message}`));
        }
    }


    const handleChange = (e) => {
        setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value })
    }
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type="email" value={user.email} onChange={handleChange} name="email" />
                <input type="mobile" value={user.mobile} onChange={handleChange} name="mobile" />
                <button>Submit</button>
            </form>
        </main>
    )
}

export default Form
