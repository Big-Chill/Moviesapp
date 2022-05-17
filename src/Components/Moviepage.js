import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Moviepage() {
    const history=useHistory();
    const[currmovie,setCurrMovie]=useState([]);
    const[title,setTitle]=useState('');
    const[languages,setLanguages]=useState("");
    const[banner,setBanner]=useState([]);
    const[ratings,setRatings]=useState({});
    const[runtime,setRuntime]=useState("");
    const[genres,setGenres]=useState("");
    const[year,setYear]=useState("");
    const[plot,setPlot]=useState("");
    const[actors,setActors]=useState([]);

    
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user") || "[]");
        if(user.length===0)
        {
            history.push('/signin');
        }
        const movie=JSON.parse(localStorage.getItem("movie") || "[]");
        setCurrMovie(movie[0]);
        setBanner(movie[0].banner);
        setTitle(movie[0].title);
        setLanguages(movie[0].Languages);
        setRatings({...movie[0].Ratings});
        setRuntime(movie[0].RuntimeStr);
        setGenres(movie[0].genres);
        setYear(movie[0].year);
        setPlot(movie[0].Plot);
        setActors(movie[0].Actors_list);
    },[]);

    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };

    




  return (
    <div>
        <div style={{width:"100%"}}>
            <div>
                <img src={banner} alt="" style={{height:"42vw"}}/>
            </div>
        </div>
        <div className="title-div">
            <span style={{fontSize:"40px"}}>{title}</span>&nbsp;&nbsp;
            <span className="lang-div">({languages})</span>
        </div>
        <div className="title-div">
            <img src="imdblogo.png" style={{width:"60px", height:"40px"}}/>&nbsp;&nbsp;
            <p style={{marginTop:"7px"}}>{ratings.imDb}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p style={{marginTop:"7px"}}>|</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p style={{marginTop:"7px"}}>{runtime}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p style={{marginTop:"7px"}}>|</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p style={{marginTop:"7px"}}>{genres}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p style={{marginTop:"7px"}}>|</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p style={{marginTop:"7px"}}>{year}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>

        <div className="title-div">
            <p>{plot}</p>
        </div>
        <div>
        {
            actors.length>0?
                
            <div>
                <div className="title-div">
                    <h2>Crew</h2>
                </div>

                    <div className="slider-div" style={{color:"white"}}>
                        <Slider {...settings2}>
                            {
                                actors.map((actor,index)=>{
                                    return(
                                        <div key={index}>
                                            <img src={actor.image} alt="" style={{height:"20vw",width:"18vw",borderRadius:"5px"}}/>
                                            <span>{actor.name}</span>
                                            <span>({actor.asCharacter})</span>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
                    :
                    <div className="title-div">
                        <p>Description:</p>
                        <p>{currmovie.description}</p>
                    </div>
        }
        </div>
    </div>
  )
}
