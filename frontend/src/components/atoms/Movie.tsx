import styled from "styled-components";
import Grade from "./Grade";
import IMovie from "../../interfaces/Movie";

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
interface MovieParams {
    movie:IMovie,
    onSelect:()=>void
}
function Movie(params:MovieParams) {
    return (
    <MovieContainer onClick={params.onSelect}>
        <MoviePoster imgURL={params.movie.image_url}>
            <Grade grade={params.movie.grade_no as string}/>
        </MoviePoster>
    </MovieContainer>
    );
}

export default Movie;