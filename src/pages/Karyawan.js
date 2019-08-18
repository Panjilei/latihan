import React, { Component } from 'react';
import Axios from 'axios';

export default class Karyawan extends Component {
    constructor() {
        super()
        this.state = {
            karyawan: []
        }
    }
    componentWillMount() {
        Axios 
            .get('http://localhost:3001/karyawan')
            .then((response) => {
                this.setState({
                    karyawan: response.data 
            })
        })
}
render() {
    function renderKaryawan(karyawanList) {
        return karyawanList.map(karyawan => {
            return <tr key={karyawan.id}>
                <td>{karyawan.id}</td>
                <td>{karyawan.nama}</td>
                <td>{karyawan.usia}</td>
                <td>{karyawan.kota}</td>
            </tr>
        })
    }
    return (
        <div>
            <h1>
                Ini Data Karyawan
            </h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nama</th>
                        <th>Usia</th>
                        <th>Kota</th>
                    </tr>
                </thead>
                <tbody>
                    {renderKaryawan(this.state.karyawan)}
                </tbody>
            </table>
        </div>
    )
    }
}