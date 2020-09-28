import React from 'react';
import {
	StyledHeader, LeftNav, StyledLink, RightNav,
} from './Header.styles';

const Header = () => (
	<StyledHeader>
		<LeftNav>
			<StyledLink to="/">Pathfinding app</StyledLink>
		</LeftNav>
		<RightNav>
			<StyledLink to="/">Home</StyledLink>
			<StyledLink to="/levels">Levels</StyledLink>
		</RightNav>
	</StyledHeader>
);

export default Header;
