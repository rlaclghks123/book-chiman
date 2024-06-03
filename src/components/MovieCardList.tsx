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
          <Img
            src={
              data.poster_path
                ? `${IMG_BASE_URL}/${data.poster_path}`
                : 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt="movie Poster"
          />
          <Description>
            <DescriptionParagraph>{`제목 : ${data.title || '제목없음'}`}</DescriptionParagraph>
            <DescriptionParagraph>{`개봉일 : ${data.release_date || '없음'}`}</DescriptionParagraph>
            <DescriptionParagraph>{`장르 : ${
              toStringGenresWithComma(data.genre_ids) || '없음'
            }`}</DescriptionParagraph>
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
  grid-template-rows: repeat(3, 10rem);
  gap: 10px;

  width: 100%;
  height: 100%;
  overflow: auto;
`;

const GridItemLink = styled(Link)`
  display: flex;
  padding: 10px;
  opacity: 0.8;
  height: 50%;

  &:hover {
    opacity: 1;
  }
`;

const Img = styled.img`
  margin-right: 20px;
  border-radius: 10px;

  min-width: 6rem;
  min-height: 6rem;

  background-color: grey;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 70%;
`;

const DescriptionParagraph = styled.p`
  margin: 5px;
  padding: 3px 0px;

  color: white;
  font-size: 15px;
  font-family: 'Montserrat', sans-serif;
`;

const NotFoundData = styled.div`
  width: 85vw;
  margin-top: 50px;

  text-align: center;
  font-size: 20px;
`;
