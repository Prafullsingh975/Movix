import  { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import {ContentWrapper} from '../exportComponents'
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const controlNavbar = ()=>{
        if (window.screenY > 200 && !mobileMenu) {
            if(window.screenY > lastScrollY){
                setShow('hide')
            }else{
                setShow('show')
            }
        }else{
            setLastScrollY('top')
        }
        setLastScrollY(window.screenY);
    }

    useEffect(()=>{
        window.addEventListener('scroll',controlNavbar);
        return ()=>{
        window.removeEventListener('scroll',controlNavbar);
            
        }
    },[lastScrollY]);
    useEffect(()=>{
        window.scrollTo(0,0)
    },[location]);

    const openSearch = ()=>{
        setMobileMenu(false);
        setShowSearch(true);
    }
    const openMobileMenu = ()=>{
        setMobileMenu(true);
        setShowSearch(false);
    }
    const navigationHandler = (type)=>{
        switch (type) {
            case 'movie':
                navigate('/explore/movie')
                break;
                case 'tv':
                navigate('/explore/tv')
                break;
            default:
                break;
        }
        setMobileMenu(false);
    }
    const searchQueryHandler = (event)=>{
        if(event.key === "Enter" && query.trim().length > 0){
          navigate(`/search/${query}`);
          setTimeout(()=>{
            setShowSearch(false);
          },1000)
        }
      }

    return (
        <header className={`header ${mobileMenu ? 'mobileView':""} ${show}`}>
            <ContentWrapper>
            <div className="logo" onClick={()=>navigate('/')}>
                <img src={logo} alt="logo" />
            </div>
            <ul className="menuItems">
                <li className="menuItem" onClick={()=>navigationHandler("movie")}>Movies</li>
                <li className="menuItem" onClick={()=>navigationHandler("tv")}>TV Shows</li>
                <li className="menuItem">
                    <HiOutlineSearch onClick={openSearch} />
                </li>
            </ul>
            <div className="mobileMenuItems">
                <HiOutlineSearch onClick={openSearch} />
                {mobileMenu ? (<VscChromeClose onClick={()=>setMobileMenu(false)} />):(<SlMenu onClick={openMobileMenu}/>)}
            </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                <ContentWrapper>
                <div className="searchInput">    
                <input
               type="text"
               placeholder="Search for a movies or TV shows..."
               onChange={(e)=>setQuery(e.target.value)}
               onKeyUp={searchQueryHandler} />
              <VscChromeClose onClick={()=>setShowSearch(false)}/>
                </div>
                </ContentWrapper>
            </div>
            )}
        </header>
    );
};

export default Header;
