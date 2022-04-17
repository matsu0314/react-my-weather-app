import React from 'react';
import styled from 'styled-components';
import { DefaultLayout } from '../layout/DefaultLayout';
import notFoundImg from '../../assets/images/not-found.png';



export const Page404 = () => {
  return (
    <DefaultLayout>
      <div className="container">
        <NotFoundStyle>
          <div>

          <img src={notFoundImg}/>
            <p>ページがみつかりません</p>
            </div>
          </NotFoundStyle>
      </div>
    </DefaultLayout>
  );
};

const NotFoundStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  font-size: 1.3em;
  text-align:center;
  @media (max-width: 640px) {
    font-size: 1em;
  }
  img {
    max-width: 260px;
    @media (max-width: 640px) {
      max-width: 40vw;
    }
  }
`;
