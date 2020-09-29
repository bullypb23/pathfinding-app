import styled from 'styled-components';

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

export const ErrorParagraph = styled.p`
	padding: 10px 0 0;
	font-size: 1.2rem;
	color: red;
`;
