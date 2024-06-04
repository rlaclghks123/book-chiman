import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  totalCount: number | undefined;
  curPage: number;
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
}

function sliceArrayByLimit(totalCount: number | undefined, limit: number) {
  if (totalCount) {
    const size = Math.ceil(totalCount / limit);
    const totalPageArray = Array.from({ length: size }, (_, i) => i + 1);
    return Array.from({ length: size }, () => totalPageArray.splice(0, limit));
  }
}

function Pagenation({ totalCount, curPage, setCurPage }: Props) {
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [curPageGroup, setCurPageGroup] = useState(0);
  const [pagenationArr, setPagenationArr] = useState([[1]]);
  const limit = 9;

  const handlePrev = useCallback(() => {
    setCurPage((prev) => prev - 1);
    setCurPageGroup(Math.floor((curPage - 2) / 10));
  }, [curPage, setCurPage]);

  const handleClickPage = useCallback(
    (index: number) => {
      setCurPage(index);
    },
    [setCurPage]
  );

  const handleNext = useCallback(() => {
    setCurPage((prev) => prev + 1);
    setCurPageGroup(Math.floor(curPage / 10));
  }, [curPage, setCurPage]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalCount, 10);
    if (slicedPageArray) setPagenationArr(slicedPageArray);
  }, [totalCount]);

  useEffect(() => {
    if (totalCount) setNumberOfPages(Math.ceil(totalCount / limit));
    if (totalCount === 0) {
      setPagenationArr([[1]]);
      setCurPage(1);
    }
  }, [totalCount, setCurPage]);

  if (totalCount === undefined) return null;

  return (
    <Wrapper>
      <PagenationList>
        <PagenationItem onClick={handlePrev} disabled={curPage === 1}>
          {'<'}
        </PagenationItem>
        {pagenationArr[curPageGroup]?.map((number) => (
          <PagenationItem
            key={number}
            onClick={() => handleClickPage(number)}
            $clicked={number === curPage}
          >
            {number}
          </PagenationItem>
        ))}
        <PagenationItem onClick={handleNext} disabled={curPage === numberOfPages - 1}>
          {'>'}
        </PagenationItem>
      </PagenationList>
    </Wrapper>
  );
}

export default Pagenation;

const Wrapper = styled.div`
  width: 100%;
  height: 2rem;
`;

const PagenationList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  height: 100%;
`;

const PagenationItem = styled.button<{ $clicked?: boolean }>`
  display: flex;
  align-items: center;

  height: 100%;

  padding: 5px 10px;
  border: 1px solid white;
  border-radius: 5px;

  color: white;
  cursor: pointer;

  &:hover {
    color: black;
    background-color: white;
  }

  background-color: ${(props) => (props.$clicked ? 'white' : 'inherit')};
  color: ${(props) => (props.$clicked ? 'black' : 'white')};
`;
