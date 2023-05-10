import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { demoMovies } from '../interfaces/Movie';
import Movie from './atoms/Movie';
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
  return (
    <MoviesContainer>
      {
        demoMovies.map(movie => <Movie movie={movie} onSelect={params.onSelect}/>)
      }
    </MoviesContainer>
  )
}
export default Movies;