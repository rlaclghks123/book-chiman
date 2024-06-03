import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import ReviewUpdateOrDelete from './ReviewUpdateOrDelete';
import UpdateReviewInput from './UpdateReviewInput';

import { useReadReview } from '../../hooks/api/useReadReview';
import { addLikeFetcher } from '../../api/addLikeFetcher';
import { AddLike, Review } from '../../types/reviews';

const ProfileSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
    </svg>
  );
};
const UnClickedLikeSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
    </svg>
  );
};

const ClickedLikeSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
    </svg>
  );
};

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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reviews'] }),
    onError: () => alert('실패했습니다!'),
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
                  {Array.from({ length: reviews.score }, () => (
                    <span>⭐️</span>
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
`;
