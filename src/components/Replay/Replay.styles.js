import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
`;

export const SmallHeading = styled.h5`
	font-size: 1.3rem;
	color: #34495E;
	font-weight: bold;
	padding-bottom: 10px;
`;

export const Button = styled.button`
	color: white;
  background-color: #1ABC9C;
  padding: 10px 20px;
	margin: 10px;
  border: none;
	outline: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #28E1BD;
  }
`;
