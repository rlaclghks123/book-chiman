import { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { searchFilterState, searchKeywordState } from '../../atoms/searchAtom';

function SearchBar() {
  const [curKeyword, setCurKeyword] = useState('');
  const setSelectedFilter = useSetRecoilState(searchFilterState);
  const setKeyword = useSetRecoilState(searchKeywordState);

  const handleChangeFilterSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(curKeyword);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurKeyword(e.target.value);
  };

  return (
    <Wrapper>
      <SearchBarSelect onChange={handleChangeFilterSelect}>
        <option value="title">제목명</option>
        <option value="director">감독명</option>
      </SearchBarSelect>

      <Form onSubmit={handleSubmit}>
        <SearchBarInput onChange={handleSearchChange} value={curKeyword} />
      </Form>
    </Wrapper>
  );
}

export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  width: 50%;
  height: 100%;
`;

const Form = styled.form`
  width: 100%;
  height: 80%;
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 70%;
  border-radius: 0px 15px 15px 0px;
`;

const SearchBarSelect = styled.select`
  height: 70%;
  background-color: white;
  border: none;
`;
