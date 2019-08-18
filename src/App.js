import React, { Component } from 'react';
import Axios from 'axios';
import { Route, Link } from 'react-router-dom';
import firebase, {googleProvider} from './firebase'
import Upload from './pages/Upload';
import Karyawan from './pages/Karyawan'


class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      posts: [],
      users: [],
      hospitals: [],
      loggedUser: null
    }
  }
  async login() {
    const result = await firebase.auth().signInWithPopup(googleProvider);
    this.setState({loggedUser: result.user});
  }
  async logout() {
    await firebase.auth().signOut()
    this.setState({loggedUser: null});
  }
  componentWillMount() {
    Axios
      .get('https://facebook.github.io/react-native/movies.json')
      .then((response) => {
        this.setState({
          movies: response.data.movies
        })
      })
    Axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        this.setState({
          posts: response.data
        })
      })
    Axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        this.setState({
          users: response.data
        })
      })
    Axios
      .get('https://api.jakarta.go.id/rumahsakitumum', {
        headers: {
          Authorization: 'v3pP0k7wzdvXvNYUrFBJ/jW5P0XSSAAxSHisis+tGw02k15Xhbi20oURCuD90el1',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        this.setState({
          rsu:response.data.data
        })
      })
  }
  render() {
    function renderMovieList(movies) {
      return movies.map(movie => {
        return <li key={movie.id}>{movie.title} - {movie.releaseYear}</li>
      })
    }
    function renderPostList(posts) {
      return posts.map(post => {
        return <li key={post.id}>{post.id} - {post.title}</li>
      })
    }
    function renderUserRow(users) {
      return users.map(user => {
        return <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td> 
        <td>{user.phone}</td>
        </tr>
      })
    }
    return (
      <div>
        <p>
          {this.state.loggedUser ? `Hi,
          ${this.state.loggedUser.displayName}!` : 'Hi!'}
        </p>
        <button onClick={this.login.bind(this)}>
          Login with Google
        </button>
        <button onClick={this.logout.bind(this)}>
          Logout
        </button>

        <h1>Ini Portofolio saya</h1>
        <ul>
          <li>
            <Link exact to="/">Home</Link>
          </li>
          <li>
            <Link exact to="/karyawan">Karyawan</Link>
          </li>
          <li>
            <Link to='/upload'>upload</Link>
          </li>
        </ul>

        <Route path='/karyawan' component={Karyawan}/>
        <Route path='/Upload' component={Upload}/>

        <h2>Movie List</h2>
        <ul>{renderMovieList(this.state.movies)}</ul>
        <h2>Post List</h2>
        <ul>{renderPostList(this.state.posts)}</ul>
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>No.Telp</th>  
            </tr>
          </thead>
          <tbody>
            {renderUserRow(this.state.users)}
          </tbody>
        </table>
      </div>   
    );
  }
}

export default App;
