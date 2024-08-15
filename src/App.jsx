
import { RouterProvider } from "react-router-dom";
import { router } from "./route/Router";
// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
      <RouterProvider router={router}> </RouterProvider>
    </>
  );
}

export default App;
