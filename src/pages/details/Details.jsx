/* eslint-disable no-unused-vars */
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { DetailsBanner, Cast, VideosSection, Similer, Recommendation } from "../exportPages";
import "./style.scss";
const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similer mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </>
  );
};

export default Details;
