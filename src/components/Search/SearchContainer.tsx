import styled from 'styled-components';

import SelectViewRadio from './SelectViewRadio';
import SearchBar from './SearchBar';
import SearchSortSelect from './SearchSortSelect';
import SearchFilterSelect from './SearchFilterSelect';

function SearchContainer() {
  return (
    <Wrapper>
      <SelectViewRadio />
      <SearchBar />
      <SelectBox>
        <SearchFilterSelect />
        <SearchSortSelect />
      </SelectBox>
    </Wrapper>
  );
}

export default SearchContainer;

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 3rem;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
