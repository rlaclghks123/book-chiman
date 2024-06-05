import styled from 'styled-components';
import { ReactComponent as GithubSvg } from '../assets/svgs/github.svg';
import { ReactComponent as FileSvg } from '../assets/svgs/file.svg';
import media from '../styles/media';

const DESCRIPTION_DATA = [
  { title: '이름', content: '김치환' },
  { title: '이메일', content: 'rlaclghks123@naver.com' },
  { title: '깃허브', content: <GithubSvg />, link: 'https://github.com/rlaclghks123' },
  {
    title: '이력서',
    content: <FileSvg />,
    link: 'https://rightful-lodge-a68.notion.site/af4051dc8a7147549b022dd0f76d550d?pvs=4',
  },
];

function HomePage() {
  return (
    <Wrapper>
      <Title>안녕하세요. 프론트엔드 지원자 김치환입니다.</Title>
      <Introduce>
        <Img
          src="https://github.com/rlaclghks123/movie-chiman/assets/55423198/07920fb1-bb28-455d-a178-532dc3a40ad2"
          alt="PROFILE"
        />
        <Description>
          {DESCRIPTION_DATA.map((description, idx) => (
            <DescriptionList key={idx}>
              <DescriptionTitle>{description.title}</DescriptionTitle>
              {description.link && (
                <a href={description.link} target="blank">
                  {description.content}
                </a>
              )}
              {!description.link && <div>{description.content}</div>}
            </DescriptionList>
          ))}
        </Description>
      </Introduce>
    </Wrapper>
  );
}

export default HomePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  width: 100%;
  height: 100%;

  padding-top: 5rem;
  padding: 5rem 30%;
  box-sizing: border-box;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  white-space: nowrap;

  ${media.tablet`
    font-size:1rem;
  `}

  ${media.mobile`
    font-size:0.8rem;
  `}
`;

const Introduce = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;

  width: 100%;
  white-space: nowrap;
`;

const Img = styled.img`
  width: 350px;
  height: 400px;
  border-radius: 15px;
  box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.12), 0 1px 1px;

  ${media.tablet`
    width: 250px;
    height: 300px;
  `}

  ${media.mobile`
    width: 150px;
    height: 200px;
  `}
`;

const DescriptionTitle = styled.div`
  width: 4rem;
  padding-right: 10px;
  margin-right: 10px;
  border-right: 2px solid white;
`;

const Description = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 40%;
  height: 100%;

  color: white;
  font-size: 20px;

  ${media.tablet`
    font-size:15px;
  `}

  ${media.mobile`
    font-size:12px;
  `}
`;

const DescriptionList = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;

  a {
    color: white;
  }

  svg {
    width: 25px;
    height: 25px;
    fill: white;
    opacity: 1;

    &:hover {
      opacity: 0.7;
    }
  }
`;
