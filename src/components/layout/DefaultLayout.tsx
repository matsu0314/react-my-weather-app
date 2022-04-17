import React, {ReactNode} from 'react'
import { Header } from '../Header';
import { Footer } from '../Footer';

type Props = {
  children: ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({children}) => {

  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  )
};
