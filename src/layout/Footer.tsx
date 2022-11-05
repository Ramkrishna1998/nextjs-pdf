import {
  PencilAltIcon,
  SparklesIcon,
  UserAddIcon,
  UsersIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ROUTES } from '../config/constants';
import { useStore } from '@/store';

type Props = {
  contents: {
    footer: {
      addressText1: string;
      addressText2: string;
      email: string;
      mobile1: string;
      mobile2: string;
    };
  };
};

export const Footer = ({ contents }: Props): JSX.Element => {
  const router = useRouter();
  const { clearData } = useStore().mainStore;
  const url = router.pathname;

  const navigation = [
    {
      url: ROUTES.EVENTS,
      icon: <SparklesIcon className='inline-block w-6 h-6' />,
    },
    {
      url: ROUTES.VIEW,
      icon: <UsersIcon className='inline-block w-6 h-6' />,
    },
    {
      url: ROUTES.MAIN,
      icon: <ViewGridIcon className='inline-block  w-10 h-10' />,
    },
    {
      url: ROUTES.ADD,
      icon: <UserAddIcon className='inline-block w-6 h-6' />,
    },
    {
      url: ROUTES.EDIT,
      icon: <PencilAltIcon className='inline-block w-6 h-6' />,
    },
  ];

  const routeTo = (url: string) => {
    clearData();
    router.push(url);
  };

  return (
    <div className='fixed inset-x-0 bottom-0 py-2 px-4 rounded bg-primary-500'>
      <div id='tabs' className='flex justify-between items-center'>
        {navigation.map((nav) => (
          <button
            type='button'
            key={nav.url}
            onClick={() => routeTo(nav.url)}
            className={clsx('p-1 justify-center inline-block text-center', {
              'text-mine-shaft-900': nav.url === url,
              'text-neutral-500': nav.url !== url,
            })}
          >
            {nav.icon}
            {/* <span className='block text-xs'>Home</span> */}
          </button>
        ))}
      </div>
    </div>
  );
};
