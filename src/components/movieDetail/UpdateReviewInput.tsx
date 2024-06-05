import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { updateReviewFetcher } from '../../api/updateReviewFetcher';
import { UpdateReview } from '../../types/reviews';
import { SCORE_SELECT_DATA } from './WriteReview';
import Select from '../common/Select';
import media from '../../styles/media';

interface Props {
  review: string;
  id: number;
  setClickedUpdateId: React.Dispatch<React.SetStateAction<number>>;
}

function UpdateReviewInput({ review, id, setClickedUpdateId }: Props) {
  const [curReview, setCurReview] = useState(review);
  const [score, setScore] = useState(5);

  const queryClient = useQueryClient();

  const { mutate: updateReviewMutate } = useMutation({
    mutationFn: (payload: UpdateReview) => updateReviewFetcher(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reviews'] }),
    onError: () => alert('실패했습니다!'),
  });

  const handleClick = (id: number) => {
    const payload = {
      id,
      curReview,
      score,
    };

    if (curReview.trim() === '') {
      alert('검색어를 입력해주세요');
      setCurReview('');
      return;
    }

    updateReviewMutate(payload);
    setClickedUpdateId(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurReview(e.target.value);
  };

  return (
    <Wrapper>
      <Input value={curReview} onChange={handleChange} />
      <Score>
        <p>평점 ⭐️ : </p>
        <Select setter={setScore} options={SCORE_SELECT_DATA} />
      </Score>
      <Button type="button" onClick={() => handleClick(id)}>
        수정
      </Button>
    </Wrapper>
  );
}

export default UpdateReviewInput;

const Wrapper = styled.div`
  display: flex;

  ${media.mobile`
    flex-direction: column;
    gap:10px;
  `}
`;

const Input = styled.input`
  outline: none;

  width: 50rem;

  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding-bottom: 5px;

  background-color: inherit;
  color: white;
  font-size: 18px;

  &:focus {
    border-bottom: 2px solid rgba(255, 255, 255, 1);
  }

  ${media.mobile`
    width:15rem;
  `}
`;

const Button = styled.button`
  margin-left: 20px;
  padding: 10px;
  border-radius: 15px;
  border: 2px solid rgba(255, 255, 255, 1);

  background-color: inherit;
  color: white;
  opacity: 0.6;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 1;
    color: black;
    background-color: white;
  }

  ${media.mobile`
    width:5rem;
    margin-left: 0px;
  `}
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 8rem;
  white-space: nowrap;
`;
