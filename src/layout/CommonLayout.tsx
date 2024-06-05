import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const HEADER_DATA = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'Movies', link: '/movies' },
];

function Header() {
  return (
    <HeaderBox>
      <Ul>
        {HEADER_DATA.map((list) => (
          <Li key={list.id}>
            <Link to={list.link}>{list.title}</Link>
          </Li>
        ))}
      </Ul>
    </HeaderBox>
  );
}

function CommonLayout() {
  return (
    <Wrapper>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
}

export default CommonLayout;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  color: white;
`;

const HeaderBox = styled.header`
  position: fixed;
  top: 0px;
  z-index: 100;

  height: 70px;
  width: 100%;
  border-bottom: 1px solid grey;
  background-color: black;
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  font-size: 1.5rem;
  font-family: 'Permanent Marker', cursive;
  font-weight: 400;
  font-style: normal;

  &:hover {
    border-bottom: 1px solid #86868b;
  }

  a {
    color: white;
  }
`;

const Main = styled.main`
  height: calc(100vh - 70px);
  padding-top: 70px;
`;
