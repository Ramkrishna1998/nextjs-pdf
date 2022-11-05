import { envVars } from '@/config';

const UIInspector = (): JSX.Element | null => {
  if (envVars.screenDebugger) {
    return (
      <div
        style={{ zIndex: 1000 }}
        className='fixed bottom-0 right-0 flex items-center justify-center w-8 h-8 p-6 font-bold border opacity-75 bg-neutral-50'
      >
        <div className='block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden'>XS</div>
        <div className='hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden'>SM</div>
        <div className='hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden'>MD</div>
        <div className='hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden'>LG</div>
        <div className='hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden'>XL</div>
        <div className='hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block'>2XL</div>
      </div>
    );
  }
  return null;
};

export default UIInspector;
