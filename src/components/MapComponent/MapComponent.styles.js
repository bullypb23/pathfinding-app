import styled from 'styled-components';

export const MapContainer = styled.div`
	width: 100%;
	padding: 20px 0;

	@media (max-width: 576px) {
		max-width: 100vw;
		padding: 20px 10px;
  }
`;

export const Row = styled.div`
	width: 100%;
	height: 30px;
	display: flex;
	justify-content: center;

	@media (max-width: 576px) {
    height: 20px;
  }
`;
