import { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { searchKeywordState } from '../../atoms/searchAtom';

const RefreshSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
    </svg>
  );
};
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
