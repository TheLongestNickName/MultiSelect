import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { MultiSelect } from "./modules/components/MultiSelect";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MultiSelect />
    </QueryClientProvider>
  );
}

export default App;
