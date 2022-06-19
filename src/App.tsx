import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Registr from "./components/Registr";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="">
          <Route path="register" element={<Registr></Registr>}></Route>
          <Route path="" element={<Auth></Auth>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//Пароль - 123