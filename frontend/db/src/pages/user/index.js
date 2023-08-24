import { useState, useEffect } from "react"
import { Modal } from "bootstrap"
import axios from "axios"
const baseURL = `http://localhost:8000`
const header = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

const User = () => {
    const [id_user, setIdUser] = useState(0)
    const [nama_user, setNamaUser] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState(true)
    const [isEdit, setIsEdit] = useState(true)
    const [password, setPassword] = useState("")
    const [modal, setModal] = useState(null)
    const [user, setUser] = useState([])


    const getUser = () => {
        const url = `${baseURL}/user`
        axios.get(url, header)
            .then(response => {
                setUser(response.data.data)
            })
            .catch(error => console.log(error))
    }

    const addUser = () => {
        setIdUser(0)
        setNamaUser("")
        setUsername("")
        setRole(true)
        setPassword("")
        modal.show()
    }

    const editUser = item => {
        setIdUser(item.id_user)
        setNamaUser(item.nama_user)
        setUsername(item.username)
        setRole(item.role)
        setPassword(item.password)
        modal.show()
    }

    const saveUser = event => {
        event.preventDefault()
        modal.hide()
        let payload = { id_user, nama_user, username, role }
        if (isEdit) {
            // proses edit
            let url = `${baseURL}/user/${id_user}`
            axios.put(url, payload, header)
                .then(response => {
                    window.alert(`Data user berhasil diubah`)
                    // recall user
                    getUser()
                })
                .catch(error => console.log(error))
        } else {
            // proses insert 
            let url = `${baseURL}/user`
            axios.post(url, payload, header)
                .then(response => {
                    window.alert(`Data user berhasil ditambah`)
                    // recall user
                    getUser()
                })
                .catch(error => console.log(error))
        }
    }

    const dropUser = (item) => {
        if (window.confirm(`Apakah anda yakin??`)) {
            const url = `${baseURL}/user/${item.id_user}`
            axios.delete(url, header)
                .then(response => {
                    window.alert(`Data user berhasil dihapus`)
                    // recall user
                    getUser()
                })
                .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        getUser()
        setModal(new Modal(`#modal-user`))
    }, [])

    return (
        <div className="w-100" style={{ backgroundColor: "#FFECEF", borderTop: "3px solid maroon" }}>
            <h2 className='text-center mt-2'>
                <b>Daftar User</b>
                <h4 className="text-center mt-2">
                    <p><em>Wikusama
                        <span className="ms-2 text-danger">
                            Cafe
                        </span>
                    </em></p>
                </h4>
            </h2>
            <button className="btn btn-primary m-1 mb-3" onClick={() => addUser()}>
                Tambah User
            </button>
            <ul className="list-group">
                {user.map(User => (
                    <li className="list-group-item mb-2"
                        key={`keyUser${User.id_user}`}>
                        <div className="row">
                            <div className="col-md-2">
                                <small className="text-danger">
                                    Nama User
                                </small> <br />
                                {User.nama_user}
                            </div>

                            <div className="col-md-2">
                                <small className="text-danger">
                                    username
                                </small> <br />
                                {User.username}
                            </div>

                            <div className="col-md-2">
                                <small className="text-danger">
                                    Role
                                </small> <br />
                                {User.role}
                            </div>

                            <div className="col-md-4">
                                <small className="text-danger">
                                    Password
                                </small> <br />
                                {User.password}
                            </div>

                            <div className="col-md-2">
                                <small className="text-danger">
                                    Action
                                </small> <br />
                                <button className="btn btn-sm btn-warning m-1"
                                    onClick={() => editUser(User)}>
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button className="btn btn-sm btn-danger m-1"
                                    onClick={() => dropUser(User)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/** modal user */}
            <div className="modal fade" id="modal-user">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <form onSubmit={saveUser}>
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    Form User
                                </h4>
                            </div>

                            <div className="modal-body">
                                <small>Nama User</small>
                                <input type="text" className="form-control mb-2"
                                    value={nama_user}
                                    onChange={e => setNamaUser(e.target.value)} />

                                <small>Username</small>
                                <input type="text" className="form-control mb-2"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)} />

                                <small>Role</small>
                                <select className="form-control mb-2"
                                    value={role}
                                    onChange={e => setRole(e.target.value)}>
                                    <option value={true}>Pilih Role</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Kasir">Kasir</option>
                                </select>

                                <small>Password</small>
                                <input type="password"
                                    className="form-control mb-2"
                                    required={true}
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} />

                                <button type="submit" className="btn btn-warning w-100">
                                    Simpan
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default User