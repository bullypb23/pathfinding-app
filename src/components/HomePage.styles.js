import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Heading = styled.h1`
  font-size: 4rem;
  color: #34495E;
  padding: 20px 0;

	@media (max-width: 576px) {
		font-size: 3rem;
  }
`;

export const InformationDiv = styled.div`
  display: flex;
	justify-content: space-around;
	margin-top: 20px;

	@media (max-width: 768px) {
		padding: 0 20px;
		justify-content: center;
		flex-wrap: wrap;
  }
`;

export const LinkContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 10px 0;
`;

export const StyledButton = styled.button`
  color: white;
  background-color: #1ABC9C;
  padding: 10px 20px;
	margin: 0 10px;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #28E1BD;;
  }

	&:disabled {
		background-color: #AAAAAA;
	}
`;

export const Container = styled.div`
  flex-basis: 30%;
	padding: 20px;
	border: 1px solid #1ABC9C;
	border-radius: 10px;

	@media (max-width: 768px) {
    flex-basis: 45%;
		margin: 5px;
  }
	
	@media (max-width: 576px) {
    flex-basis: 100%;
		margin: 10px 0;
  }
`;

export const Paragraph = styled.p`
  font-size: 1.2rem;
  padding: 10px 0;

	@media (max-width: 576px) {
    padding: 10px;
  }
`;

export const SizeButton = styled.button`
  outline: none;
  background-color: transparent;
  padding: 10px 15px;
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid #26BFA1;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  margin-left: 10px;
  transition: all 0.2s ease-in;

  &:hover {
    background-color: #26BFA1;
    color: #fff;
  }
`;

export const SizeButtonRight = styled(SizeButton)`
  margin-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
`;

export const SizeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

export const Size = styled.div`
  padding: 10px 15px;
  font-size: 1.2rem;
  border: 1px solid #26BFA1;
`;

export const ErrorParagraph = styled(Paragraph)`
  color: red;
`;

export const Span = styled.span`
  font-size: inherit;
`;
