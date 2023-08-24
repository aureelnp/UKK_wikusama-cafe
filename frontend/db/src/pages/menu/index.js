import React from 'react'
import Menuitem from './menuitem'
import { useState, useEffect } from 'react'
import axios from 'axios' //for connect to another server
import { Modal } from "bootstrap"

const baseURL = "http://localhost:8000"
const header = {
    headers: {
        Authorization:
            `Bearer ${localStorage.getItem('token')}`
    }
}
export default function Menu() {
    /** define state for store menu */
    const [menus, setMenus] = useState([])

    /** define state to store prop of menu */
    const [idMenu, setIDMenu] = useState(0)
    const [nama_menu, setNamaMenu] = useState("")
    const [jenis, setJenis] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [harga, setHarga] = useState(0)
    const [gambar, setGambar] = useState(undefined)

    /** define state to store modal */
    const [modal, setModal] = useState(undefined)

    /** define state to store status of edit */
    const [isEdit, setIsEdit] = useState(undefined)

    const [keyword, setKeyword] = useState("")

    async function getMenu() {
        try {
            let url = `${baseURL}/menu`
            let { data } = await axios.get(url, header)
            setMenus(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function searching(e) {
        try {
            //  jika menekan tombol enter 
            if (e.keyCode == 13) {
                let url = `${baseURL}/menu/find`
                let dataSearch = {
                    keyword: keyword
                }
                let { data } = await axios.post(url, dataSearch, header)
                setMenus(data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function addMenu() {
        // show modal 
        modal.show()

        // reset state of menu
        setIDMenu(0)
        setNamaMenu("")
        setDeskripsi("")
        setHarga(0)
        setJenis("")
        setGambar(undefined)
        setIsEdit(false)
    }
    async function edit(menu) {
        /** open modal */
        modal.show()
        setIsEdit(true)
        setIDMenu(menu.id_menu)
        setNamaMenu(menu.nama_menu)
        setDeskripsi(menu.deskripsi)
        setHarga(menu.harga)
        setJenis(menu.jenis)
        setGambar(undefined)

    }

    async function saveMenu(e) {
        try {
            e.preventDefault()
            /** close the modal */
            modal.hide()

            if (isEdit) {
                /** ini untuk edit */
                let form = new FormData()
                form.append("nama_menu", nama_menu)
                form.append("harga", harga)
                form.append("jenis", jenis)
                form.append("deskripsi", deskripsi)

                if (gambar != undefined) {
                    form.append("gambar", gambar)
                }

                /** send to backend */
                let url = `${baseURL}/menu/${idMenu}`
                let result = await axios.put(
                    url, form, header
                )
                if (result.data.status == true) {
                    /** refresh data menu */
                    getMenu()

                }
                window.alert(result.data.message)

            } else {
                /** ini untuk tambah */
                let form = new FormData()
                form.append("nama_menu", nama_menu)
                form.append("harga", harga)
                form.append("jenis", jenis)
                form.append("deskripsi", deskripsi)
                form.append("gambar", gambar)

                /** send to backend */
                let url = `${baseURL}/menu`
                let result = await axios.post(
                    url, form, header
                )
                if (result.data.status == true) {
                    /** refresh data menu */
                    getMenu()

                }
                window.alert(result.data.message)

            }

        } catch (error) {
            console.log(error);

        }
    }

    async function drop(menu) {
        try {
            if (window.confirm(`Apakah Anda yakin menghapus ${menu.nama_menu}?`)) {
                let url = `${baseURL}/menu/${menu.id_menu}`
                axios.delete(url)
                    .then(result => {
                        if (result.data.status == true) {
                            window.alert(result.data.message)
                        }
                        /** refresh data */
                        getMenu()
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        } catch (error) {
            console.log(error);
        }
    }
    /** menjalankan aksi saat komponen ini di load */
    useEffect(() => {
        // initializing modal
        setModal(new Modal(`#modalMenu`))
        getMenu()
    }, [])

    return (
        <div className='container-fluid' style={{ backgroundColor: "#FFECEF", backgroundRepeat: false, backgroundSize: 'cover' }}>
            <h2 className='text-center mt-2'>
                <b>
                    <i className='bi bi-justify'></i>
                    Daftar Menu</b>
                <h4 className="text-center mt-2">
                    <p><em>Wikusama
                        <span className="ms-2 text-danger">
                            Cafe
                        </span>
                    </em></p>
                </h4>
            </h2>
            <hr />

            <input type='text'
                className='form-control m-2 my-2'
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyUp={e => searching(e)}></input>

            <button className='btn btn-info mb-3 m-2 center-block' onClick={() => addMenu()}>
                Tambah Menu
            </button>

            <div className='row'>
                {menus.map(menu => (
                    <div key={`menu${menu.id_menu}`}
                        className="col-md-3 col-lg-3">
                        <Menuitem
                            img={`${baseURL}/menu_image/${menu.gambar}`}
                            nama_menu={menu.nama_menu}
                            deskripsi={menu.deskripsi}
                            harga={menu.harga}
                            jenis={menu.jenis}
                            onEdit={() => edit(menu)}
                            onDelete={() => drop(menu)} />
                    </div>
                ))}
            </div>

            {/* create div of modal */}
            <div className='modal fade' id='modalMenu'>
                <div className='modal-dialog modal-md'>
                    <div className='modal-content'>
                        <form onSubmit={e => saveMenu(e)}>
                            <div className='modal-header'
                                style={{ background: 'pink' }}>
                                <h4>Form Menu</h4>
                            </div>

                            <div className='modal-body'>
                                <small>Nama Menu</small>
                                <input type="text"
                                    required={true}
                                    className="form-control mb-2"
                                    value={nama_menu}
                                    onChange={e => setNamaMenu(e.target.value)}>

                                </input>

                                <small>Deskripsi</small>
                                <input type="text"
                                    required={true}
                                    className="form-control mb-2"
                                    value={deskripsi}
                                    onChange={e => setDeskripsi(e.target.value)}>

                                </input>

                                <small>Harga</small>
                                <input type="number"
                                    required={true}
                                    className="form-control mb-2"
                                    value={harga}
                                    onChange={e => setHarga(e.target.value)}>

                                </input>

                                <small>Gambar</small>
                                <input type="file"
                                    accept='image/*'
                                    className="form-control mb-2"
                                    onChange={e => setGambar(e.target.files[0])}>

                                </input>

                                <small>Jenis Menu</small>
                                <select
                                    required={true}
                                    className='form-control mb-2'
                                    value={jenis}
                                    onChange={e => setJenis(e.target.value)}>
                                    <option value="">---Pilih Jenis Makanan---</option>
                                    <option value="makanan">Makanan</option>
                                    <option value="minuman">Minuman</option>
                                </select>
                            </div>
                            <div className='modal-footer'>
                                <button type='submit' className='w-100 btn btn-info'>
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

