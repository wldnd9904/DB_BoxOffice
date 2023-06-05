import styled from "styled-components";
import Grade from "./Grade";
import IMovie from "../../interfaces/Movie";
import { useState } from "react";
import { Button } from "react-bootstrap";

const MovieContainer = styled.div`
    width: 200px;
    height: 285px;
    transition: all 0.1s linear;
    :hover {
        transform: scale(1.03);
    }
    margin: 10px;
    border-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
interface MoviePosterParams {
    imgURL: string;
}
const MoviePoster = styled.div<MoviePosterParams>`
    display:flex;
    width: 200px;
    height: 285px;
    background-image: url('${props => props.imgURL}');
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 10px;
    padding:10px;
    justify-content: right;
`;
const PosterOverlay = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:auto;
    background-color:rgba(0,0,0,0.2);
    width:100%;
    height:100%;
    top: 0; 
    left: 0;
    position:fixed;
    border-radius:10px;
`;
const CustomButton = styled(Button)`
    margin:3px;
`;
interface MovieParams {
    movie:IMovie,
    home?:boolean,
    selectable?:boolean,
    onSelect?:()=>void
    onDetail?:()=>void
}
function Movie(params:MovieParams) {
    const [hover,setHover] = useState<boolean>(false);
    return (
    <MovieContainer 
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
    >
        <MoviePoster imgURL={params.movie.image_url}>
            <Grade grade={params.movie.mov_grade_no as string}/>
        </MoviePoster>
        {
            params.selectable&&hover?
            <PosterOverlay>
                <CustomButton onClick={params.onDetail}>상세보기</CustomButton>
                {params.home?null:<CustomButton onClick={params.onSelect}>예매하기</CustomButton>}
            </PosterOverlay>
            :null
        }
    </MovieContainer>
    );
}

export default Movie;