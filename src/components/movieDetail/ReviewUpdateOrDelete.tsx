import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { deleteReviewFetcher } from '../../api/deleteReviewFetcher';

const ElipsisSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
  </svg>
);

interface Props {
  id: number;
  setClickedUpdateId: React.Dispatch<React.SetStateAction<number>>;
}

function ReviewUpdateOrDelete({ id, setClickedUpdateId }: Props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  const handleUpdate = () => {
    setClickedUpdateId(id);
    setClicked(false);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: number) => deleteReviewFetcher({ id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reviews'] }),
    onError: () => alert('실패했습니다!'),
  });

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('정말 삭제하시겠어요?')) deleteMutate(id);
    setClicked(false);
  };

  return (
    <Wrapper>
      {!clicked && <ElipsisButton onClick={handleClick}>{<ElipsisSvg />}</ElipsisButton>}
      {clicked && (
        <>
          <Button onClick={handleUpdate}>수정</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </>
      )}
    </Wrapper>
  );
}

export default ReviewUpdateOrDelete;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  right: 0;
`;

const ElipsisButton = styled.button`
  background-color: inherit;
  border: none;

  svg {
    &:hover {
      fill: white;
      cursor: pointer;
    }
  }
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 10px;
  border: 2px solid rgba(255, 255, 255, 1);
  border-radius: 15px;

  background-color: inherit;
  color: white;
  opacity: 0.6;
  cursor: pointer;

  &:hover {
    opacity: 1;
    color: black;
    background-color: white;
  }
`;
