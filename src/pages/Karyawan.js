import React, { Component } from 'react';
import firebase from '../firebase'

export default class Karyawan extends Component {
    constructor() {
        super()
        this.state = {
            karyawanList: []
        }
        this.inputElement = null
    }
    componentWillMount() {
        let karyawanRef = firebase.database().ref('karyawan').orderByKey().limitToLast(100)
        karyawanRef.on("value", snapshot => {
            // console.log('onValue', snapshot.val())
            let values = snapshot.val() || {}
            this.setState({
                karyawanList: Object.keys(values).map(key =>{
                    return {
                        key: key,
                        value: snapshot.val()[key]
                    }
                })
            })
        })
    }
    addKaryawan(e){
        e.preventDefault();
        console.log(this.inputElement.value)
        firebase.database().ref('karyawan').push( this.inputElement.value );
        this.inputElement.value = '';
    }
    deleteKaryawan(id){
        console.log('karyawan/'+ id)
        firebase.database().ref('karyawan/'+ id).remove();
    }   
    renderKaryawan(karyawanList) {
        return karyawanList.map((karyawan, i) => {
            return <li key={i}>
                {karyawan.value}&nbsp;&nbsp;&nbsp;
                <span onClick={e => this.deleteKaryawan(karyawan.key)}>x</span>
            </li>
        })
    }
    render() {
        return (
            <div>
                <h1>
                    Ini Data Karyawan
                </h1>
                <form onSubmit={this.addKaryawan.bind(this)}>
                    <input type="text" ref={e => this.inputElement = e}/>
                    <input type="submit"/>
                </form>
                <ul>
                    {this.renderKaryawan(this.state.karyawanList)}
                </ul>    
            </div>        
        )
    }
}