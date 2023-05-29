import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { demoMovies } from '../utils/demos';
import Movie from './atoms/Movie';
import { useRecoilState } from 'recoil';
import IMovie from '../interfaces/Movie';
import { selectedMovieAtom } from '../utils/recoilAtoms';
const MoviesContainer = styled.div`
  display: flex;
  margin-top: 70px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  justify-content: center;
  flex-wrap: wrap;
`;
interface MoviesParams {
  onSelect: () => void;
}
function Movies(params:MoviesParams) {
  const [selectedMovie,setSelectedMovie] = useRecoilState<IMovie>(selectedMovieAtom);
  const onSelectMovie = (movie:IMovie) => {
    setSelectedMovie(movie);
    params.onSelect();
  }
  return (
    <MoviesContainer>
      {
        demoMovies.map((movie,idx) => <Movie key={idx} movie={movie} onSelect={()=>onSelectMovie(movie)}/>)
      }
    </MoviesContainer>
  )
}
export default Movies;