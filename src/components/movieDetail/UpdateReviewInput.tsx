import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import { updateReviewFetcher } from '../../api/updateReviewFetcher';
import { UpdateReview } from '../../types/reviews';

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

    if (review === '') {
      alert('검색어를 입력해주세요');
      return;
    }

    updateReviewMutate(payload);
    setClickedUpdateId(0);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurReview(e.target.value);
  };

  const handleScrore = (e: ChangeEvent<HTMLSelectElement>) => {
    setScore(Number(e.target.value));
  };

  return (
    <Wrapper>
      <Input value={curReview} onChange={handleChange} />
      <Label>
        <p>평점 ⭐️ : </p>
        <Select onChange={handleScrore}>
          {Array.from({ length: 5 }, (_, i) => (
            <Option key={i} value={5 - i}>{`${5 - i}점`}</Option>
          ))}
        </Select>
      </Label>
      <Button type="button" onClick={() => handleClick(id)}>
        수정
      </Button>
    </Wrapper>
  );
}

export default UpdateReviewInput;

const Wrapper = styled.div`
  display: flex;
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
`;

const Button = styled.button`
  margin-left: 10px;
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
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 20px;
  white-space: nowrap;
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
