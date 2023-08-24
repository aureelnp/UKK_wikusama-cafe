import React, { useState } from "react"
import axios from "axios"


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = event => {
        event.preventDefault()
        let payLoad = { username, password }

        let url = `http://localhost:8000/auth`

        axios.post(url, payLoad)
            .then(response => {
                if (response.data.status == true) {
                    /** login succes */
                    /** grab token */
                    let token = response.data.token
                    /** grab data user */
                    let user = response.data.data

                    /** store to local storage */
                    localStorage.setItem(`token`, token)
                    localStorage.setItem(`user`, JSON.stringify(user)
                    )
                    window.alert(`Login Berhasil`)
                    window.location.href = "/menu"

                } else {
                    /** wrong username/password */
                    window.alert(`Username or password maybe wrong`)
                }
            })
            .catch(error => {
                window.alert(error)
            })
    }

    return (
        <div className="vw-100 vh-100 d-flex justify-content-center align-items-center" style={{backgroundImage: 'url(/v1065-110.png)', backgroundRepeat: false, backgroundSize: 'cover'}}>
            <div className="col-md-3 p-3 shadow border rounded-2">
                <h3 className="text-center">
                    WIKUSAMA
                    <span className="text-danger">
                        CAFE
                    </span>
                </h3>
                <form onSubmit={handleLogin} className="mt-4">
                    <input type="text"
                        className="form-control mb-2"
                        required={true}
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <input type="password"
                        className="form-control mb-2"
                        required={true}
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary w-100 mb-2">
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login