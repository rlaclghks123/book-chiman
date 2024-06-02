import styled from 'styled-components';

import SelectViewRadio from './SelectViewRadio';
import SearchBar from './SearchBar';
import SearchSortSelect from './SearchSortSelect';

function SearchContainer() {
  return (
    <Wrapper>
      <SelectViewRadio />
      <SearchBar />
      <SearchSortSelect />
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
