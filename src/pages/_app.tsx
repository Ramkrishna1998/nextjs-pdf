import type { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import { envVars } from '@/config';
import { useConstructor } from '@/hooks';
import AllProviders from '@/providers';
import { applyTheme, COLORS, themes } from '@/theme';
import { ErrorBoundary, isSSR, Logger } from '@/utils';
import '@/styles';
import "pdfjs-dist/web/pdf_viewer.css"

Logger.setLevel(envVars.log.level);

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useConstructor(() => {
    /**
     * Initially it will apply the default theme
     */
    if (!isSSR) {
      applyTheme(themes.default);
    }
  });

  return (
    <>
      <ErrorBoundary>
        <NextNprogress
          options={{ easing: 'ease', speed: 500, showSpinner: false }}
          color={COLORS.primary_900}
          startPosition={0.3}
          stopDelayMs={200}
          height={4}
          showOnShallow
        />
        <AllProviders>
          <Component {...pageProps} />
        </AllProviders>
      </ErrorBoundary>
    </>
  );
};
export default MyApp;
