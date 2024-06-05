import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import MovieIntroduce from '../components/movieDetail/MovieIntroduce';
import WriteReview from '../components/movieDetail/WriteReview';
import ReadReview from '../components/movieDetail/ReadReview';

import { useMovieDetail } from '../hooks/api/useMovieDetail';
import { Movie } from '../types/movies';
import Loading from '../components/common/Loading';
import media from '../styles/media';

export interface MovieDetail {
  data: Movie;
  isLoading: boolean;
  isError: boolean;
}

function MoviesDetailPage() {
  const { id } = useParams();

  const { data: movieDetail, isLoading, isError }: MovieDetail = useMovieDetail({ id });

  if (isError) return <div>영화를 찾을 수 없습니다. </div>;
  if (isLoading) return <Loading />;

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

  ${media.tablet`
    padding: 2rem 7.5rem 0 7.5rem;
  `}

  ${media.mobile`
    padding: 2rem 2rem 0 2rem;
  `}
`;

const ReviewContainer = styled.section`
  width: 100%;
  margin-top: 3rem;
`;
