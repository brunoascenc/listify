import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import {
  QueryClient,
  QueryClientProvider,
  DefaultOptions,
} from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';

type ProviderOptions = {
  queryClient?: QueryClient;
  withNavigation?: boolean;
};

const defaultQueryOptions: DefaultOptions = {
  queries: {
    retry: false,
  },
};

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: defaultQueryOptions,
  });

export const renderWithProviders = (
  ui: React.ReactElement,
  { queryClient = createTestQueryClient(), withNavigation = true }: ProviderOptions = {},
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    const content = withNavigation ? (
      <NavigationContainer>{children}</NavigationContainer>
    ) : (
      children
    );

    return (
      <QueryClientProvider client={queryClient}>
        {content}
      </QueryClientProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};
