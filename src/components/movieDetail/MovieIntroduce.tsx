import styled from 'styled-components';
import { toStringGenresWithComma } from '../../utils/toStringGenresWithComma';
import { IMG_BASE_URL } from '../../constants/movie';
import { Movie } from '../../types/movies';

interface Props {
  data: Movie;
}

function MovieIntroduce({ data }: Props) {
  return (
    <Wrapper>
      <Img src={`${IMG_BASE_URL}/${data.poster_path}`} alt="movie Poster" />

      <Description>
        <DescriptionParagraph>{`제목 - ${data.title}`}</DescriptionParagraph>
        <DescriptionParagraph>{`개봉일 - ${data.release_date}`}</DescriptionParagraph>
        <DescriptionParagraph>{`장르 - ${toStringGenresWithComma(
          data.genre_ids
        )}`}</DescriptionParagraph>
        <DescriptionParagraph>{`소개 - ${data.overview}`}</DescriptionParagraph>
      </Description>
    </Wrapper>
  );
}

export default MovieIntroduce;

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  overflow: hidden;
`;

const Img = styled.img`
  margin-right: 20px;
  border-radius: 10px;

  min-width: 300px;
  height: 300px;

  background-color: grey;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 1rem;
`;

const DescriptionParagraph = styled.p`
  margin: 15px;
  color: white;
  font-size: 23px;
  font-family: 'Montserrat', sans-serif;

  &:last-child {
    height: 6rem;
    overflow: auto;
    line-height: 1.2;
  }
`;
