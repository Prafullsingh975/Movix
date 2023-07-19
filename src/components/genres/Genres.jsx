import './style.scss';
import {useSelector} from 'react-redux'
const Genres = ({ data }) => {
    const {genres} = useSelector(state=>state.home);
  return(
    <div className="genres">
        {
        // eslint-disable-next-line react/prop-types
            data?.map((g)=>{
                if(!genres[g]?.name) return
            return(
                <div key={g} className="genre">
                    {genres[g]?.name}
                </div>
            )
        })}
    </div>
  );
};

export default Genres;
