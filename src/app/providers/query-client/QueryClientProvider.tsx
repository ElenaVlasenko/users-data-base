import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

const createClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000
      }
    }
  });

export const AppQueryClientProvider = ({ children }: { children: ReactNode }) => {
  const [client] = useState(createClient);

  return <TanstackQueryClientProvider client={client}>{children}</TanstackQueryClientProvider>;
};
