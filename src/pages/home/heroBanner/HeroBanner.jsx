import { useEffect, useState } from "react";

import './style.scss'

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import useFetch from "../../../hooks/useFetch";

import {Img,ContentWrapper} from '../../../components/exportComponents'

const HeroBanner = () => {
  const [background,setBackground] = useState("");
  const [query,setQuery] = useState("");
  const navigate = useNavigate();
  const {url} = useSelector((state)=>state.home) 
  const {data,loading} = useFetch('/movie/upcoming');

  useEffect(()=>{
    const bg = url.backDrop +  data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setBackground(bg);
  },[data])
  const searchQueryHandler = (event)=>{
    if(event.key === "Enter" && query.trim().length > 0){
      navigate(`/search/${query}`);
    }
  }
  return(
    <>
      <div className="heroBanner">
      {!loading && (<div className="backdrop-img">
        <Img src={background} alt={"backdrop Image"} className={""}/>
      </div>)}
      <div className="opacity-layer">
      </div>
      <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">Million of movies, TV shows and people to discover.
            Explore Now.</span>
            <div className="searchInput">
              <input
               type="text"
               placeholder="Search for a movies or TV shows..."
               onChange={(e)=>setQuery(e.target.value)}
               onKeyUp={searchQueryHandler} />
              <button>Search</button>
            </div>
          </div>
      </ContentWrapper>
      </div>
    </>
  );
};

export default HeroBanner;
