/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

import "./style.scss";

import { Img, ContentWrapper } from '../../../components/exportComponents'
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {
                            data?.map((item)=>(
                            <div key={item?.id} className="listItem">
                                <div className="profileImg">
                                    <Img src={(item?.profile_path) ? (url?.profile+item.profile_path) : avatar} alt={"image"} />
                                </div>
                                    <div className="name">{item?.name}</div>
                                    <div className="character">{item?.character}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
