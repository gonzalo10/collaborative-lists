import React from 'react';
import styled from 'styled-components';
import { Link as LinkBase } from 'react-router-dom';

import Logo from '../assets/Logo';

const Link = styled(LinkBase)`
	color: ${(props) => props.theme.dark};
	text-decoration: none;
	font-size: 22px;
`;

const NavigationBar = styled.div`
	display: flex;
	padding: 10px 20px;
	align-items: center;
	border-bottom: 1px solid ${(props) => props.theme.mid};
`;

const NavigationItemWrapper = styled.div`
	padding: 10px 25px;
`;

interface ItemProps {
	item: { name: string; link: string };
}

const items = [
	{ name: 'Movies', link: '/movies' },
	{ name: 'Books', link: '/books' }
];

const NavigationItem: React.FC<ItemProps> = ({ item }) => {
	return (
		<NavigationItemWrapper>
			<Link to={item.link}>{item.name}</Link>
		</NavigationItemWrapper>
	);
};

const Header: React.FC = () => {
	return (
		<NavigationBar>
			<Link to={'/'}>
				<Logo size='50px' padding='0px 20px 0px 0px' />
			</Link>
			<NavigationItem item={items[0]} />
			<NavigationItem item={items[1]} />
		</NavigationBar>
	);
};

export default Header;
