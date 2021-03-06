import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
  width: 100%;
  height: 50px;
  background-color: #34495E;
  display: flex;
  padding: 0 30px;

  @media (max-width: 576px) {
    padding: 0;
  }
`;

export const LeftNav = styled.div`
  flex: 1 1 30%;
`;

export const StyledLink = styled(Link)`
  height: 100%;
  color: #fff;
  padding: 10px 20px;
  font-size: 1.2rem;
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;

  &:hover {
    color: #1ABC9C;
  }
`;

export const RightNav = styled.div`
  flex: 1 1 70%;
  display: flex;
  justify-content: flex-end;
`;
