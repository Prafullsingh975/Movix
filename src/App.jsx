/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { featchDataFromApi } from './utils/api';

//React Router DOM
import {BrowserRouter,Routes,Route} from "react-router-dom";

//Pages
import { Home, SearchResult, Details, Explore, PageNotFound } from './pages/exportPages';

import { Header, Footer } from './components/exportComponents';

 //Redux
import { useSelector,useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';

function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state)=>state.home);
  const apiCallConfig = async ()=>{
    const data = await featchDataFromApi("/configuration")
    const url = {
      backDrop: data.images.secure_base_url + "original",
      poster: data.images.secure_base_url + "original",
      profile: data.images.secure_base_url + "original"
    }
    dispatch(getApiConfiguration(url));
  }

  useEffect(()=>{
    apiCallConfig();
    genresCall();
  },[]);

  const genresCall = async() =>{
    let promises = []
    let endpoints = ['tv','movie']
    let allGenres = {}
    endpoints.forEach((url)=>{
      promises.push(featchDataFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises);

    data.map(({ genres })=>{
      return genres.map((item)=>(allGenres[item.id]=item))
    })
    dispatch(getGenres(allGenres));
  }
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path='/:mediaType/:id' element = {<Details/>} />
          <Route path='/search/:query' element={<SearchResult/>}/>
          <Route path='/explore/:mediaType' element={<Explore/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
