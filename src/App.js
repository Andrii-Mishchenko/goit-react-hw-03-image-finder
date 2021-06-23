import React, {Component} from 'react';
// import PropTypes from 'prop-types'
import axios from 'axios';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import styles from './styles.module.css'
import Searchbar from './components/Searchbar'
import ImageGallery from './components/ImageGallery'
import Button from './components/Button'
import Modal from './components/Modal'



const KEY = '21204345-b994baef221a75cda7aa18f50';

class App extends Component {
  state = { 
    pictures: [],
    currentPage: 1,
    searchQuery:'',
    isLoading: false,
    error: null,
    showModal: false,
    largeImg: "",
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.searchQuery !== this.state.searchQuery) {
      this.fetchPictures()   
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query, 
      currentPage:1, 
      pictures: [],
      error: null,
    });    
  }

  fetchPictures = () => {
    const {currentPage, searchQuery} = this.state

    this.setState({isLoading: true});

    axios
    .get(`https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => {
      console.log(response)
   
      this.setState(prevState =>({
        pictures: [...prevState.pictures, ...response.data.hits],
        currentPage:prevState.currentPage+1,
      }))      
    })
    .catch(error => this.setState({error}))
    .finally(() => this.setState({isLoading:false}));

  }

  onCloseModal = () => {
    this.setState(({showModal}) => ({
      showModal: false,
      largeImg: "" 
    }));
  }

  onOpenModal = (largeImageURL) => {
    this.setState({
      largeImg: largeImageURL,
      showModal: true,
    });
  };


  render() { 
    const {pictures, isLoading, error, showModal, largeImg} = this.state;

    return ( 
      <div className={styles.App}>
        {error && <h1>Something went wrong! Please, try again later</h1>}

        <Searchbar onSubmit={this.onChangeQuery}/>
        <ImageGallery pictures={pictures} onPictureClick={this.onOpenModal}/> 

        {pictures.length > 0 && !isLoading && (
          <Button onClick={this.fetchPictures}/>
        )}

        {isLoading &&
        <Loader
          type="ThreeDots" 
          color="#d400ff" 
          height={80} 
          width={80}
          text-align="center"
          timeout={3000} //3 secs
        />}        
      
        {showModal && 
        <Modal 
          onClose={this.onCloseModal}
          largeImg={largeImg}
        />}
      </div>
     );
  };
}
 
export default App;
