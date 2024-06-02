import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { IMG_BASE_URL } from '../constants/movie';
import Deffered from './Deffered';
import { Movie } from '../types/movies';
import { toStringGenresWithComma } from '../utils/toStringGenresWithComma';

interface Props {
  data: Movie[];
  isLoading: boolean;
}

function MovieCardList({ data, isLoading }: Props) {
  return (
    <GridContainer>
      {isLoading && <Deffered>로딩중...</Deffered>}

      {!isLoading && !data?.length && <NotFoundData>정보가 없습니다.</NotFoundData>}

      {data?.map((data) => (
        <GridItemLink key={data.id} to={String(data.id)}>
          <Img src={`${IMG_BASE_URL}/${data.poster_path}`} alt="movie Poster" />
          <Description>
            <DescriptionParagraph>{`제목 : ${data.title}`}</DescriptionParagraph>
            <DescriptionParagraph>{`개봉일 : ${data.release_date}`}</DescriptionParagraph>
            <DescriptionParagraph>{`장르 : ${toStringGenresWithComma(
              data.genre_ids
            )}`}</DescriptionParagraph>
          </Description>
        </GridItemLink>
      ))}
    </GridContainer>
  );
}

export default MovieCardList;

const GridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;

  height: 100%;
  width: 100%;
`;

const GridItemLink = styled(Link)`
  display: flex;
  padding: 10px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

const Img = styled.img`
  margin-right: 20px;
  border-radius: 10px;

  min-width: 200px;
  height: 180px;

  background-color: grey;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 1rem;
`;

const DescriptionParagraph = styled.p`
  margin: 10px 10px;

  color: white;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
`;

const NotFoundData = styled.div`
  width: 85vw;
  margin-top: 50px;

  text-align: center;
  font-size: 20px;
`;
