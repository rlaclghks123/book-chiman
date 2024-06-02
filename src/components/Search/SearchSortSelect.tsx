import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { searchSortTypeState } from '../../atoms/searchAtom';

function SearchSortSelect() {
  const setSortType = useSetRecoilState(searchSortTypeState);

  const handleChangeSortSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
  };

  return (
    <Wrapper onChange={handleChangeSortSelect}>
      <option value="release_date">최신순</option>
      <option value="title">이름순</option>
      <option value="popularity">인기순</option>
    </Wrapper>
  );
}

export default SearchSortSelect;

const Wrapper = styled.select`
  height: 70%;
  background-color: white;
  border: none;
`;
