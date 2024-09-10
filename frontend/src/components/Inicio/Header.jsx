import React from 'react';
import { HeaderContainer, Title, MenuButton } from './styles';

const Header = ({ toggleSidebar }) => {
    return (
        <HeaderContainer>
            <MenuButton onClick={toggleSidebar}>☰</MenuButton>
            <Title>Sacolão Senai</Title>
        </HeaderContainer>
    );
};

export default Header;