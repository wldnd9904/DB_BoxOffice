import styled from "styled-components";
import { IMovie } from "../interfaces/Movie";
import Grade from "./Grade";

const MovieContainer = styled.div`
    width: 200px;
    height: 285px;
    transition: all 0.1s linear;
    :hover {
        transform: scale(1.03);
    }
    margin: 10px;
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
interface MovieParams {
    movie:IMovie,
    onSelect:()=>void
}
function Movie(params:MovieParams) {
    return (
    <MovieContainer onClick={params.onSelect}>
        <MoviePoster imgURL={params.movie.imageURL}>
            <Grade grade={params.movie.grade as string}/>
        </MoviePoster>
    </MovieContainer>
    );
}

export default Movie;