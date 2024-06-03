import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Deffered from '../components/Deffered';
import MovieIntroduce from '../components/movieDetail/MovieIntroduce';
import WriteReview from '../components/movieDetail/WriteReview';
import ReadReview from '../components/movieDetail/ReadReview';

import { useMovieDetail } from '../hooks/api/useMovieDetail';
import { Movie } from '../types/movies';

export interface MovieDetail {
  data: Movie;
  isLoading: boolean;
  isError: boolean;
}

function MoviesDetailPage() {
  const { id } = useParams();

  const { data: movieDetail, isLoading, isError }: MovieDetail = useMovieDetail({ id });

  if (isError) return <div>영화를 찾을 수 없습니다. </div>;
  if (isLoading) return <Deffered>로딩중..</Deffered>;

  return (
    <Wrapper>
      <MovieIntroduce data={movieDetail} />

      <ReviewContainer>
        <WriteReview />
        <ReadReview />
      </ReviewContainer>
    </Wrapper>
  );
}

export default MoviesDetailPage;

const Wrapper = styled.section`
  padding: 3rem 20rem 0rem 20rem;
`;

const ReviewContainer = styled.section`
  width: 100%;
  margin-top: 3rem;
`;
