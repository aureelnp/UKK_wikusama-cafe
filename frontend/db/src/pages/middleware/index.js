import React from "react";

const Middleware = ({ children, roles}) => {
    if (!localStorage.getItem('token')) {
        return window.location.href = '/login'
    }

    // get user data from local storage
    let user = JSON.parse(localStorage.getItem('user'))
    if (roles.includes(user.role)) {
        return children
    }
    return (
        <div style={{ backgroundColor: "#F2D8D8", backgroundRepeat: false, backgroundSize: 'cover' }}>
            <h1 className="text-center">FORBIDDEN ACCESS</h1>
        </div>
    )
}
export default Middleware