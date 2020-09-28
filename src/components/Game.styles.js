import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
`;

export const Container = styled.div`
width: 100%;
padding: 10px 0;
`;

export const Section = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: flex-start;

	@media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

export const AlgorithmsContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;

	@media (max-width: 576px) {
    padding: 0;
  }
`;

export const Checkbox = styled.input`
	margin-right: 10px;
`;

export const Label = styled.label`
	font-size: 1.2rem;
  padding: 10px 0;
`;

export const Heading = styled.h3`
  font-size: 2rem;
  padding: 10px 0;
	color: #34495E;
`;

export const ErrorParagraph = styled.p`
	padding: 10px 0 0;
	font-size: 1.2rem;
	color: red;
`;

export const ButtonContainer = styled.div`
	width: 100%;
	padding: 20px 0;
	display: flex;
	justify-content: center;

	@media (max-width: 576px) {
		flex-direction: column;
		align-items: center;
  }
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

	&:disabled {
		background-color: #AAAAAA;
	}

	@media (max-width: 576px) {
    width: 50%;
  }
`;
