import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { saveReviewFetcher } from '../../api/saveReviewFetcher';
import { Review } from '../../types/reviews';

function WriteReview() {
  const { id } = useParams();
  const [review, setReview] = useState('');
  const [score, setScore] = useState(5);
  const queryClient = useQueryClient();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value);
  };

  const handleScrore = (e: ChangeEvent<HTMLSelectElement>) => {
    setScore(Number(e.target.value));
  };

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
          onChange={handleInputChange}
          value={review}
          autoComplete={'off'}
        />
        <Label>
          <p>평점 ⭐️ : </p>
          <Select onChange={handleScrore}>
            {Array.from({ length: 5 }, (_, i) => (
              <Option key={i} value={5 - i}>{`${5 - i}점`}</Option>
            ))}
          </Select>
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
  font-size: 20px;
`;

const Writer = styled.div`
  min-width: 7%;
  white-space: nowrap;
`;

const Input = styled.input`
  width: 70%;
  margin-left: 15px;
  background-color: inherit;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  outline: none;
  color: white;
  padding-bottom: 5px;
  font-size: 18px;

  &:focus {
    border-bottom: 2px solid rgba(255, 255, 255, 1);
  }
`;

const Button = styled.button`
  background-color: inherit;
  border-radius: 15px;
  color: white;
  opacity: 0.6;
  padding: 10px;
  border: 2px solid rgba(255, 255, 255, 1);
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    opacity: 1;
    color: black;
    background-color: white;
  }
`;

const Select = styled.select`
  width: 4rem;
  height: 2rem;

  margin: 0px 5px;
  border-radius: 5px;

  background-color: black;
  color: white;
  font-size: 16px;
`;

const Option = styled.option`
  background: grey;
  color: grey;
`;
