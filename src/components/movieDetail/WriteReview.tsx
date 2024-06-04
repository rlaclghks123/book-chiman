import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { saveReviewFetcher } from '../../api/saveReviewFetcher';
import { Review } from '../../types/reviews';
import Select from '../common/Select';

export const SCORE_SELECT_DATA = Array.from({ length: 5 }, (_, i) => {
  return {
    value: 5 - i,
    name: `${5 - i}점`,
  };
});

function WriteReview() {
  const { id } = useParams();
  const [review, setReview] = useState('');
  const [score, setScore] = useState(5);
  const queryClient = useQueryClient();

  const { mutate: reviewMutate } = useMutation({
    mutationFn: (payload: Omit<Review, 'id'>) => saveReviewFetcher(payload),

    onSuccess: () => {
      alert('성공적으로 저장이 완료되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: () => alert('실패했습니다!'),
  });

  const handleClick = () => {
    const writeId = localStorage.getItem('writeId');

    if (!writeId) {
      const random = String(Math.random() * 100);
      localStorage.setItem('writeId', random);
    }

    const result = {
      movieId: id,
      review,
      like: 0,
      score,
      createAt: new Date().toISOString().split('T')[0],
      writeId,
    };

    if (review === '') {
      alert('검색어를 입력해주세요');
      return;
    }
    reviewMutate(result);
    setReview('');
  };

  return (
    <Wrapper>
      <Label htmlFor="writer">
        <Writer>익명 사용자 : </Writer>
        <Input
          id="writer"
          placeholder="댓글 추가..."
          onChange={(e) => setReview(e.target.value)}
          value={review}
          autoComplete={'off'}
        />

        <Label>
          <p>평점 ⭐️ : </p>
          <Select setter={setScore} options={SCORE_SELECT_DATA} />
        </Label>

        <Button type="button" onClick={handleClick}>
          댓글
        </Button>
      </Label>
    </Wrapper>
  );
}

export default WriteReview;

const Wrapper = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 18px;
  white-space: nowrap;
`;

const Writer = styled.div`
  width: 10%;
  white-space: nowrap;
`;

const Input = styled.input`
  outline: none;

  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding-bottom: 5px;
  margin-left: 35px;

  width: 50rem;
  color: white;
  background-color: inherit;
  font-size: 18px;

  &:focus {
    border-bottom: 2px solid rgba(255, 255, 255, 1);
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
