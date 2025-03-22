import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { FunctionComponent, PropsWithChildren } from "react";

const queryClient = new QueryClient()

const QueryProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider
