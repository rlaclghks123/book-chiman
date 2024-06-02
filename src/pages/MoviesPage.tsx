import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useMovies } from '../hooks/api/useMovies';

import MovieCardList from '../components/MovieCardList';
import SearchContainer from '../components/Search/SearchContainer';

import {
  searchFilterState,
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
  const searchFilter = useRecoilValue(searchFilterState);
  const searchSort = useRecoilValue(searchSortTypeState);
  const [curPage, setCurPage] = useState(1);
  const {
    data: movieDatas,
    totalCount,
    isLoading,
  }: Movies = useMovies({
    keyword,
    searchFilter,
    curPage,
    searchSort,
  });

  return (
    <Wrapper>
      <SearchContainer />
      <ViewContainer>
        {curViewType === 'card-view' && <MovieCardList data={movieDatas} isLoading={isLoading} />}
        {curViewType === 'list-view' && <div>list</div>}
      </ViewContainer>
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
  height: 80%;
  margin-top: 1rem;
  box-sizing: border-box;
`;
