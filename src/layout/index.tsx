import clsx from 'clsx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { useStore } from '@/store';

type Props = {
  title: string;
  backRoute?: boolean;
  children: React.ReactNode;
  contents: {
    header: {
      logo: string;
      text: string;
    };
    footer: {
      addressText1: string;
      addressText2: string;
      email: string;
      mobile1: string;
      mobile2: string;
    };
  };
};
const WithLayout = ({ children, title, contents, backRoute }: Props): any => {
  const { loading } = useStore().mainStore;
  return (
    <div
      className={clsx('w-full h-screen bg-gray-100', {
        'pointer-events-none': loading,
      })}
    >
      <div className='w-full bg-gray-100'>
        <div className='w-full'>
          <Header contents={{ header: contents.header }} backRoute={backRoute} title={title} />
        </div>
        {children}
      </div>
      <Footer contents={{ footer: contents.footer }} />
    </div>
  );
};
WithLayout.defaultProps = {
  backRoute: false,
};
export default observer(WithLayout);
