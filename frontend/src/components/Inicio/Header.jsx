import React from 'react';
import { HeaderContainer, Title, MenuButton } from '../Style/HeaderStyle/headerStyle';

const Header = ({ toggleSidebar, isOpen }) => {
    return (
        <HeaderContainer>
            <MenuButton onClick={toggleSidebar} isOpen={isOpen}>
                <span></span>
                <span></span>
                <span></span>
            </MenuButton>
            <Title>Sacolão Senai</Title>
        </HeaderContainer>
    );
};

export default Header;