import React from "react";
import { RouterProvider } from "react-router-dom";
import appRouter from "./pages/router";
import { queryClient, QueryClientProvider } from "./configs/reactQuery";
import worker from "./mocks/worker";
import { ThemeProvider } from "@emotion/react";
import theme from "./themes/theme";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
