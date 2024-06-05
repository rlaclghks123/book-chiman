import styled from 'styled-components';
import { toStringGenresWithComma } from '../../utils/toStringGenresWithComma';
import { IMG_BASE_URL } from '../../constants/movie';
import { Movie } from '../../types/movies';
import media from '../../styles/media';

interface Props {
  data: Movie;
}

function MovieIntroduce({ data }: Props) {
  return (
    <Wrapper>
      <Img
        src={
          data.poster_path
            ? `${IMG_BASE_URL}/${data.poster_path}`
            : 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        alt="movie Poster"
      />
      <Description>
        <DescriptionParagraph>{`제목 - ${data.title || '제목없음'}`}</DescriptionParagraph>
        <DescriptionParagraph>{`개봉일 - ${data.release_date || '없음'}`}</DescriptionParagraph>
        <DescriptionParagraph>{`장르 - ${
          toStringGenresWithComma(data.genre_ids) || '없음'
        }`}</DescriptionParagraph>
        <DescriptionParagraph>{`소개 - ${data.overview || '없음'}`}</DescriptionParagraph>
      </Description>
    </Wrapper>
  );
}

export default MovieIntroduce;

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  overflow: hidden;
  ${media.mobile`
  flex-direction:column;
  align-items: center;

  `}
`;

const Img = styled.img`
  margin-right: 20px;
  border-radius: 10px;

  min-width: 250px;
  height: 250px;

  background-color: grey;

  ${media.tablet`
    min-width: 200px;
    height: 200px;
  `}

  ${media.mobile`
    width: 50px;
    height: 250px;
  `}
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 1rem;
`;

const DescriptionParagraph = styled.p`
  margin: 12px;
  color: white;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;

  &:last-child {
    height: 6rem;
    overflow: auto;
    line-height: 1.2;
  }

  ${media.mobile`
    font-size:15px;
  `}
`;
