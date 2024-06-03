import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { searchFilterTypeState } from '../../atoms/searchAtom';
import { GENGRES } from '../../constants/movie';

function SearchFilterSelect() {
  const setFilterType = useSetRecoilState(searchFilterTypeState);

  const handleChangeSortSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterType(Number(e.target.value));
  };

  return (
    <Wrapper onChange={handleChangeSortSelect}>
      <Option value="0">장르별</Option>
      <Option value="878">{GENGRES.find((item) => item.id === 878)?.name}</Option>
      <Option value="53">{GENGRES.find((item) => item.id === 53)?.name}</Option>
      <Option value="28">{GENGRES.find((item) => item.id === 28)?.name}</Option>
    </Wrapper>
  );
}

export default SearchFilterSelect;

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
