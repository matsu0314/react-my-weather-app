import React from 'react';
import styled from 'styled-components';
import jma from '../assets/images/banner_jma.gif';

export const Footer = () => {
  return (
    <FooterStyle>
      <div className="container">
        <FlexStyle>
          <div className="footer_txt">
            このサイトは気象省のデータを使用しています。
          </div>
          <div>
            <a href="https://www.jma.go.jp/jma/index.html" target="_blank">
              <img className="footer_jma_logo" src={jma} alt="気象省" />
            </a>
          </div>
        </FlexStyle>
        <CopyrightStyle>© 2022 今日の天気</CopyrightStyle>
      </div>
    </FooterStyle>
  );
};

const FooterStyle = styled.footer`
  background: #294a4e;
  color: #fff;
  margin-top: 40px;
  padding: 20px 10px;
`;

const FlexStyle = styled.div`
  display: flex;
  justify-content: space-between;
  .footer_txt {
    font-size: 0.8em;
  }
  .footer_jma_logo {
    max-width: 80px;
  }
`;

const CopyrightStyle = styled.div`
  margin-top: 20px;
  font-size: 0.8em;
  text-align: center;
`;
