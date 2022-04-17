import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { HeaderButton } from './button/HeaderButton';
import logo from '../assets/images/logo.png';

export const Header = () => {
  return (
    <HeaerStyle>
      <div className="container">
        <FlexStyle>
          <LogoStyle>
            <img src={logo} alt="今日の天気" />
          </LogoStyle>

          <MenuStyle>
            <HeaderButton elementClassName={'area'}>
              <NavLink to="/" exact activeClassName="active">
                エリア別
              </NavLink>
            </HeaderButton>
            <HeaderButton elementClassName={'all-area'}>
              <NavLink to="/all-area" activeClassName="active">
                全国
              </NavLink>
            </HeaderButton>
          </MenuStyle>
        </FlexStyle>
      </div>
    </HeaerStyle>
  );
};

const HeaerStyle = styled.header`
  background: #e6e3d6;
  padding: 20px 0;
  @media (max-width: 640px) {
    padding: 10px 0;
  }
`;

const FlexStyle = styled.div`
  display: flex;
  align-items: flex-end;
  @media (max-width: 640px) {
    display: block;
  }
`;

const LogoStyle = styled.div`
  max-width: 240px;
  img {
    width: 100%;
  }
  @media (max-width: 640px) {
    margin: 0 auto 10px;
  }
`;

const MenuStyle = styled.div`
  display: flex;
  margin-left: auto;
  margin-bottom: -20px;
  @media (max-width: 640px) {
    margin-left: -10px;
    margin-right: -10px;
    margin-bottom: -10px;
  }
`;
