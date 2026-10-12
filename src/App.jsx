import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { MyRoutes, AuthContextProvider, ThemeContextProvider } from './index';

function App() {
  return (
    <>
      <ThemeContextProvider>
        <AuthContextProvider>
          <MyRoutes />
          <ReactQueryDevtools initialIsOpen={true} />
        </AuthContextProvider>
      </ThemeContextProvider>
    </>
  );
}

export default App;
