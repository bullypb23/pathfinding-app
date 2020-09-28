import styled from 'styled-components';

export const Wrapper = styled.div`
	flex-basis: 60%;
	display: flex;
	flex-wrap: wrap;
	margin: 10px;
	
	@media (max-width: 576px) {
		flex-basis: 90%;
  }

	@media (max-width: 768px) {
		flex-basis: 90%;
  }
`;

export const LevelNumber = styled.div`
	flex: 1 1 100%;
	background-color: #CCCCCC;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	padding: 10px 0;
`;

export const AlgorithmContainer = styled.div`
	flex: 1 1 100%;
	display: flex;
	border: 1px solid #CCCCCC;

	@media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

export const Algorithm = styled.div`
	flex: 1 1 100%;
	padding: 10px;
`;

export const Heading = styled.h3`
	font-size: 2rem;
	color: #34495E;
`;

export const SmallHeading = styled.h5`
	font-size: 1.3rem;
	color: #34495E;
	font-weight: bold;
	padding-bottom: 5px;
`;

export const Paragraph = styled.p`
	font-size: 1rem;
	color: #34495E;
	padding: 5px 0;
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
