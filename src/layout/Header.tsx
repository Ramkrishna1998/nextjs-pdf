import { ChevronLeftIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {
  title?: string;
  header?: boolean;
  backRoute?: boolean;
  contents: {
    header: {
      logo: string;
      text: string;
    };
  };
};
export const Header = ({ title, header, backRoute, contents }: Props): JSX.Element => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className='flex flex-col w-full '>
      <div className='flex flex-col w-full h-full p-4 shadow-sm bg-primary-400'>
        <div className='w-full'>
          <div className='flex flex-row items-center justify-between w-full space-x-6'>
            <Image
              width='100%'
              height='100%'
              priority
              alt='no'
              className='w-32 h-auto'
              src={contents.header.logo}
            />
            <p className='text-lg font-semibold text-justify'>{contents.header.text}</p>
          </div>
        </div>
        {/* <div className='absolute bottom-0 w-full p-4 bg-primary-500'>
        <div className='flex flex-col'>
          <p className='text-white text-xxs'>Address:- C/o. Bunglow No. 29, Somnathnagar Society</p>
          <p className='text-white text-xxs'>
            Opp. Ambica Hardware, Vijaynagar Road, Naranpura, Ahmedabad - 380013
          </p>
          <a className='mt-2 text-white text-xxs' href='mailto:hvosamnd2020@gmail.com'>
            Email: hvosamd2020@gmail.com
          </a>
          <p className='text-white text-xxs'>Mo.: 9727798789, 9426994276</p>
        </div>
      </div> */}
      </div>
      {header && (
        <div className='flex items-center w-full p-4 bg-white shadow-md'>
          {backRoute ? (
            <button
              type='button'
              className='flex items-center px-2 py-1 space-x-2 rounded-md hover:stroke-storm-dust-200 bg-storm-dust-100'
              onClick={goBack}
            >
              <ChevronLeftIcon className='w-4 h-4 text-neutral-900' />
              {/* <span className='text-sm text-storm-dust-500'>Back</span> */}
            </button>
          ) : null}
          <p className='justify-center w-full text-lg font-semibold text-center '>{title}</p>
        </div>
      )}
    </div>
  );
};
Header.defaultProps = { title: '', header: true, backRoute: false };
