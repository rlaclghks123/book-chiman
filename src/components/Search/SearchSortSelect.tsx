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
      <Option value="release_date">최신순</Option>
      <Option value="title">이름순</Option>
      <Option value="popularity">인기순</Option>
    </Wrapper>
  );
}

export default SearchSortSelect;

const Wrapper = styled.select`
  height: 70%;

  background-color: black;
  border-radius: 5px;
  color: white;
  margin: 0px 10px;
`;

const Option = styled.option`
  background: grey;
  color: grey;
`;
