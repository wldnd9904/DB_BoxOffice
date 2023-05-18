import React, { useState } from "react";
import axios from "axios";
import "./RestAPI.css";

function RestAPI(){
    const [text, setText] = useState([]);

    return (
        <>
            <h1>REST API Practice</h1>
            <div className="btn-primary">
                <button
                    onClick={()=>{
                        axios.post("http://127.0.0.1:8000/movie/",{
                            movie_no:"4",
                            title: "슈퍼마리오",
                            running_time:120,
                            descriptions:"이걸로 재밌게 만들줄 몰랐는데 개오짐",
                            genre:3
                        }).then(function (response){
                            console.log(response);
                        }).catch(function(error){
                            console.log(error);
                        });
                    }}>
                        POST
                    </button>

                <button
                    onClick={()=>{
                        axios.get("http://127.0.0.1:8000/movie/")
                        .then(function (response){
                            setText([...response.data]);
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                    }}>
                        GET
                    </button>
                </div>   
                {text.map((e)=>(
                    <div>
                        {" "}
                        <div className="list">
                           <span>
                                {e.movie_no}번, {e.title},{e.running_time},{e.descriptions},{e.genre}
                            </span>
                            <button
                                className="btn-delete"
                                onClick={()=>{
                                    axios.delete(`http://127.0.0.1:8000/movie/${e.movie_no}/`);
                                    setText(text.filter((text)=> text.movie_no !== e.movie_no));
                                }}>
                                DELETE
                            </button>{" "}
                        </div>
                    </div>
                ))}  
        </>
    );
}

export default RestAPI;