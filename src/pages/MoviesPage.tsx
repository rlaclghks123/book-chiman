import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useMovies } from '../hooks/api/useMovies';

import MovieCardList from '../components/MovieCardList';
import SearchContainer from '../components/Search/SearchContainer';
import Pagenation from '../components/Pagenation';
import MovieList from '../components/MovieList';

import {
  searchFilterTypeState,
  searchKeywordState,
  searchSortTypeState,
  viewTypeState,
} from '../atoms/searchAtom';
import { Movie } from '../types/movies';

interface Movies {
  data: Movie[];
  totalCount: number | undefined;
  isLoading: boolean;
}

function MoviesPage() {
  const keyword = useRecoilValue(searchKeywordState);
  const curViewType = useRecoilValue(viewTypeState);
  const searchSort = useRecoilValue(searchSortTypeState);
  const searchFilter = useRecoilValue(searchFilterTypeState);
  const [curPage, setCurPage] = useState(1);

  const {
    data: movieDatas,
    totalCount,
    isLoading,
  }: Movies = useMovies({
    keyword,
    curPage,
    searchFilter,
    searchSort,
  });

  return (
    <Wrapper>
      <SearchContainer />
      <ViewContainer>
        {curViewType === 'card-view' && <MovieCardList data={movieDatas} isLoading={isLoading} />}
        {curViewType === 'list-view' && <MovieList data={movieDatas} isLoading={isLoading} />}
      </ViewContainer>

      <Pagenation totalCount={totalCount} curPage={curPage} setCurPage={setCurPage} />
    </Wrapper>
  );
}

export default MoviesPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: black;
  padding: 2rem 10rem 0 10rem;
  box-sizing: border-box;
`;

const ViewContainer = styled.div`
  width: 100%;
  height: 70%;
  margin-top: 3rem;
  margin-bottom: 2rem;
  box-sizing: border-box;
`;
