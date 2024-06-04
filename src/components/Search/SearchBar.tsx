import { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { searchKeywordState } from '../../atoms/searchAtom';
import { ReactComponent as RefreshSvg } from '../../assets/svgs/refresh.svg';

function SearchBar() {
  const [curKeyword, setCurKeyword] = useState('');
  const setKeyword = useSetRecoilState(searchKeywordState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(curKeyword);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurKeyword(e.target.value);
  };

  const handleRefresh = () => {
    setKeyword('');
    setCurKeyword('');
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <SearchBarInput
          placeholder="영화 제목을 입력해주세요"
          onChange={handleSearchChange}
          value={curKeyword}
        />
      </Form>
      <Button onClick={handleRefresh}>
        <RefreshSvg />
      </Button>
    </Wrapper>
  );
}

export default SearchBar;

const Wrapper = styled.div`
  position: relative;
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
  border-radius: 10px;
  padding: 5px;

  &::placeholder {
    padding: 0px 5px;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 0px;
  top: 15px;

  padding: 0px;
  border: none;
  width: 20px;
  height: 20px;

  background-color: inherit;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }

  svg {
    width: 100%;
    height: 100%;
    fill: black;
  }
`;
