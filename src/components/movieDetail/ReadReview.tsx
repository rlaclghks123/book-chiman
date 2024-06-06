import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import ReviewUpdateOrDelete from './ReviewUpdateOrDelete';
import UpdateReviewInput from './UpdateReviewInput';

import { useReadReview } from '../../hooks/api/useReadReview';
import { addLikeFetcher } from '../../api/addLikeFetcher';
import { AddLike, Review } from '../../types/reviews';

import { ReactComponent as ProfileSvg } from '../../assets/svgs/profile.svg';
import { ReactComponent as UnClickedLikeSvg } from '../../assets/svgs/unlike.svg';
import { ReactComponent as ClickedLikeSvg } from '../../assets/svgs/clickedLike.svg';
import media from '../../styles/media';

function isWriter(writeId: string | null) {
  const writeIdInLocalstorage = localStorage.getItem('writeId');
  return writeIdInLocalstorage === writeId;
}

function ReadReview() {
  const { id } = useParams();
  const { data: reviews }: { data: Review[] } = useReadReview({ id });
  const [clickedLikeId, setClickedLikeId] = useState<{ [key: number]: boolean }>({});
  const [clickedUpdateId, setClickedUpdateId] = useState(0);

  const queryClient = useQueryClient();
  const { mutate: likeMutate } = useMutation({
    mutationFn: (payload: AddLike) => addLikeFetcher(payload),

    onMutate: async (newReview) => {
      await queryClient.cancelQueries({ queryKey: ['reviews', id] });

      const previousReviews = queryClient.getQueryData<Review[]>(['reviews', id]);

      const updatedReviews = previousReviews?.map((review) => {
        if (review.id === Number(newReview.listId)) {
          return { ...review, like: newReview.like };
        } else return review;
      });

      queryClient.setQueryData(['reviews', id], updatedReviews);

      return { previousReviews, updatedReviews };
    },

    onError: (err, newTodo, context) => {
      alert('좋아요를 수정할 수 없습니다.');
      queryClient.setQueryData(['reviews', id], context?.previousReviews);
      setClickedLikeId({});
    },
  });

  const handleClickLike = (e: React.MouseEvent<HTMLElement>, id: number) => {
    const parentNode = e.currentTarget?.parentNode as HTMLElement;

    const prevLike = Number(parentNode.querySelector('p')?.textContent);
    const listId = e.currentTarget.closest('li')?.dataset.reviewId;

    let payload;
    if (!clickedLikeId[id]) {
      payload = { listId, like: (prevLike ?? 0) + 1 };
    } else {
      payload = { listId, like: (prevLike ?? 0) - 1 };
    }

    setClickedLikeId((prev) => {
      return { ...prev, [id]: !prev[id] };
    });

    likeMutate(payload);
  };

  return (
    <Wrapper>
      <ul>
        {reviews?.map((reviews, idx) => (
          <ReadReviewList
            key={reviews.id}
            data-review-id={reviews.id}
            data-write-id={reviews.writeId}
          >
            <Profile>{<ProfileSvg />}</Profile>

            <Description>
              <WriterAndTimeStamp>
                <p>{`익명 ${idx + 1}`}</p>
                <p>
                  {Array.from({ length: reviews.score }, (_, idx) => (
                    <span key={idx}>⭐️</span>
                  ))}
                </p>
                <p>{reviews.createAt}</p>
              </WriterAndTimeStamp>

              {clickedUpdateId !== reviews.id && <div>{reviews.review}</div>}
              {clickedUpdateId === reviews.id && (
                <UpdateReviewInput
                  id={reviews.id}
                  review={reviews.review}
                  setClickedUpdateId={setClickedUpdateId}
                />
              )}

              <LikeBox>
                <Button type="button" onClick={(e) => handleClickLike(e, reviews.id)}>
                  {clickedLikeId[reviews.id] ? <ClickedLikeSvg /> : <UnClickedLikeSvg />}
                </Button>
                <p>{reviews.like}</p>
              </LikeBox>

              {isWriter(reviews.writeId) && clickedUpdateId !== reviews.id && (
                <ReviewUpdateOrDelete id={reviews.id} setClickedUpdateId={setClickedUpdateId} />
              )}
            </Description>
          </ReadReviewList>
        ))}
      </ul>
    </Wrapper>
  );
}

export default ReadReview;

const Wrapper = styled.div`
  margin-top: 50px;
  padding-bottom: 50px;
`;

const ReadReviewList = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  position: relative;

  width: 100%;
`;

const Profile = styled.figure`
  display: flex;
  align-items: flex-start;
  width: 10%;
  margin-right: 15px;

  svg {
    width: 50px;
    height: 50px;
    fill: grey;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 85%;
  position: relative;
  margin-left: 15px;
  white-space: nowrap;

  svg {
    width: 20px;
    height: 20px;
    fill: grey;
  }
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    fill: grey;
  }
`;

const Button = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 50%;
  background-color: inherit;

  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

const WriterAndTimeStamp = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;

  font-size: 20px;

  p {
    margin: 0px 2px;
    &:last-child {
      font-size: 15px;
      color: grey;
    }
  }

  ${media.mobile`
    font-size:12px;
  `}
`;
