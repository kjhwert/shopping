import { RouterProvider } from "react-router-dom";
import appRouter from "./pages";

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
