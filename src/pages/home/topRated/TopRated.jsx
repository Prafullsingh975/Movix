/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { ContentWrapper, SwitchTabs, Carousel } from '../../../components/exportComponents'
import '../style.scss'
import useFetch from '../../../hooks/useFetch';
const Popular = () => {
    const [endPoint,setEndPoint] = useState('movie');
    const {data,loading} = useFetch(`/${endPoint}/top_rated`)
    const changeTab = (tab)=>{
        // console.log(tab.toLowerCase());
        setEndPoint(tab === "Movies"?"movie":"tv");
    }
  return(
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Top Rated</span>
            <SwitchTabs data={["Movies","TV Shows"]} onTabChange={changeTab} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={endPoint} />
    </div>
  )
};

export default Popular;
