/* eslint-disable react/prop-types */
import { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { ContentWrapper, Img, CircleRating, Genres } from '../exportComponents'
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";

const Carousel = ({data , loading, endpoint,title}) => {
    const carouselContainer = useRef();
    const {url} = useSelector(state=>state.home)
    const navigate = useNavigate();

    const skeletinItem = () =>{
        return(<div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
            </div>
        </div>)
    }

    const navigation = (direction)=>{
        const container = carouselContainer.current;
        const scrollAmount = direction === 'left'?container.scrollLeft -(container.offsetWidth + 20):container.scrollLeft + (container.offsetWidth + 20);
        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
  return (
    <>
        <div className="carousel">
            <ContentWrapper>
            {title && (<div className="carouselTitle">{title}</div>)}
                <BsFillArrowLeftCircleFill 
                    className="carouselLeftNav arrow"
                    onClick={()=>navigation('left')}
                />
                <BsFillArrowRightCircleFill 
                    className="carouselRightNav arrow"
                    onClick={()=>navigation('right')}
                />
                {
                    !loading ? (
                        <div ref={carouselContainer} className="carouselItems">
                            {
                            // eslint-disable-next-line react/prop-types
                                data?.map((item)=>{
                                    const posterUrl = item.poster_path ?  url.poster + item.poster_path :PosterFallback;
                                return(
                                    <div key={item.id} onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)} className="carouselItem">
                                    <div className="posterBlock">
                                        <Img src={posterUrl} alt={"Poster image"} />
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids.slice(0,2)}/>
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{item.title || item.name}</span>
                                        <span className="date">{dayjs(item.release_date).format("MM D, YYYY")}</span>
                                    </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) :(
                        <div className="loadingSkeleton">
                            {skeletinItem()}
                            {skeletinItem()}
                            {skeletinItem()}
                            {skeletinItem()}
                            {skeletinItem()}
                            {skeletinItem()}
                        </div>
                    )
                }
            </ContentWrapper>
        </div>
    </>
  )
};

export default Carousel;
