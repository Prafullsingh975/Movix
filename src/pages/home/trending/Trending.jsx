import { useState } from 'react';
import { ContentWrapper, SwitchTabs, Carousel } from '../../../components/exportComponents'
import '../style.scss'
import useFetch from '../../../hooks/useFetch';
const Trending = () => {
    const [endPoint,setEndPoint] = useState('day');
    const {data,loading} = useFetch(`/trending/all/${endPoint}`)
    const changeTab = (tab)=>{
        // console.log(tab.toLowerCase());
        setEndPoint(tab.toLowerCase());
      }
  return(
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <SwitchTabs data={["Day","Week"]} onTabChange={changeTab} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} />
    </div>
  )
};

export default Trending;
