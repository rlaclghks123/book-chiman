import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Movie } from '../types/movies';
import Deffered from './Deffered';
import { IMG_BASE_URL } from '../constants/movie';
import { toStringGenresWithComma } from '../utils/toStringGenresWithComma';

interface Props {
  data: Movie[];
  isLoading: boolean;
}

function MovieList({ data, isLoading }: Props) {
  return (
    <Wrapper>
      {isLoading && <Deffered>로딩중...</Deffered>}

      {!isLoading && !data?.length && <NotFoundData>정보가 없습니다.</NotFoundData>}
      <Ul>
        {data?.map((data, idx) => (
          <LinkBox key={data.id} to={String(data.id)}>
            <Li>
              <ListOrder>{idx + 1}</ListOrder>
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
                <DescriptionParagraph>{`개봉일 : ${
                  data.release_date || '없음'
                }`}</DescriptionParagraph>
                <DescriptionParagraph>{`장르 : ${
                  toStringGenresWithComma(data.genre_ids) || '없음'
                }`}</DescriptionParagraph>
              </Description>
            </Li>
          </LinkBox>
        ))}
      </Ul>
    </Wrapper>
  );
}

export default MovieList;

const Wrapper = styled.section`
  height: 100%;
  border: 0.5px solid white;
  border-radius: 15px;
  overflow: auto;
`;

const Ul = styled.ul`
  height: 100%;
  width: 100%;
`;

const LinkBox = styled(Link)`
  display: flex;
  flex-direction: column;
  min-height: 11.11%;
  box-sizing: border-box;
  padding: 15px;
  opacity: 0.7;
  border-bottom: 0.5px solid white;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &:last-child {
    border: none;
  }
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  overflow: hidden;

  padding: 0px 1rem;

  color: white;
`;

const NotFoundData = styled.div`
  padding-top: 25px;
  text-align: center;
  font-size: 20px;
`;

const ListOrder = styled.div`
  font-size: 25px;
  min-width: 2rem;
`;

const Img = styled.img`
  margin-right: 20px;
  border-radius: 10px;

  min-width: 35px;
  height: 35px;

  background-color: grey;
`;

const Description = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const DescriptionParagraph = styled.p`
  box-sizing: border-box;
  overflow: hidden;

  width: 15rem;
  height: inherit;

  color: white;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
