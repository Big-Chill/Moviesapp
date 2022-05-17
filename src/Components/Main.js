import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Main() {
    const history=useHistory();
    const[mytoken,setMytoken]=useState('');
    const[banner,setBanner]=useState([]);
    const[latest,setLatest]=useState([]);
    const[trending,setTrending]=useState([]);

    const clickMovie=(item)=>{
        let olddata=JSON.parse(localStorage.getItem("movie") || "[]");
        olddata[0]=item;
        localStorage.setItem("movie",JSON.stringify(olddata));
        let user=JSON.parse(localStorage.getItem("user") || "[]");
        if(user.length===0)
        {
            history.push('/signin');
        }
        else
        {
            history.push('/page');
        }
    }

    useEffect(()=>{
        const f=async ()=>{
            try
            {
                const resp=await axios.post("https://api-telly-tell.herokuapp.com/api/client/signin",{
                    email: "user@gmail.com", password: "000000"
                });
                
                const token=resp.data.token;
                setMytoken(token);

                
                const bann=await axios.get("https://api-telly-tell.herokuapp.com/banners/rahul.verma",{
                    headers: {"Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                    }
                });

                setBanner(bann["data"]["data"]);

                const lates=await axios.get("https://api-telly-tell.herokuapp.com/latest/rahul.verma",{
                    headers: {"Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                    }});

                setLatest(lates["data"]["data"]);

                const trend=await axios.get("https://api-telly-tell.herokuapp.com/movies/rahul.verma",{
                    headers: {"Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                    }});

                setTrending(trend["data"]["data"]);
            }
            catch(error)
            {
                console.log("Error :- ",error);
            }
        }
        f();
    },[])

    
    const settings1 = {
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 2000,
      };

      const settings2 = {
        dots: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false
      };


  return (
    <div>
        <div style={{width:"100%"}}>
            <Slider {...settings1}>
                {banner.map((item,index)=>{
                    return(
                        <div key={item._id}>
                            <img src={item.bannerimage} alt="" style={{height:"42vw"}}/>
                        </div>
                    )
                }
                )}
            </Slider>
        </div>
        <div>

                <div style={{marginLeft:"50px"}}>
                    <h2 style={{color:"white"}}>Latest</h2>
                    <Slider {...settings2}>
                        {
                            latest.map((item,index)=>{
                                return(
                                    <div key={item._id} className="movies">
                                        <img src={item.thumbnail} alt="" style={{height:"10vw",width:"18vw",borderRadius:"5px"}} onClick={()=>clickMovie(item)}/>
                                        <h3 style={{color:"white"}}>
                                            <div>
                                                {item.title}
                                                <div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"165px"}}>({item.Languages.length>0?item.Languages:"english"})</div>
                                            </div>
                                        </h3>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
                <div style={{marginLeft:"50px"}} className="movies">
                <h2 style={{color:"white"}}>Trending</h2>
                    <Slider {...settings2}>
                        {
                            trending.map((item,index)=>{
                                return(
                                    <div key={item._id}>
                                        <img src={item.thumbnail} alt="" style={{height:"10vw",width:"18vw",borderRadius:"5px"}} onClick={()=>clickMovie(item)}/>
                                        <h3 style={{color:"white"}}>
                                            <div>
                                                {item.title}
                                                <div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"165px"}}>({item.Languages.length>0?item.Languages:"english"})</div>
                                            </div>
                                        </h3>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>

        </div>
    </div>
  )
}
