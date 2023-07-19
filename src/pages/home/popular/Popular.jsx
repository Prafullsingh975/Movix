/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { ContentWrapper, SwitchTabs, Carousel } from '../../../components/exportComponents'
import '../style.scss'
import useFetch from '../../../hooks/useFetch';
const Popular = () => {
    const [endPoint,setEndPoint] = useState('movie');
    const changeTab = (tab)=>{
      // console.log(tab.toLowerCase());
      setEndPoint(tab === "Movies"?"movie":"tv");
    }
    const {data,loading} = useFetch(`/${endPoint}/popular`)
    console.log("Populer>>>>>>",data?.results);
  return(
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">What's Popular</span>
            <SwitchTabs data={["Movies","TV Shows"]} onTabChange={changeTab} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={endPoint} />
        
    </div>
  )
};

export default Popular;
