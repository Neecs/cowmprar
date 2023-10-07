import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
// import { SignUp } from './components/SignUp';
import FormExample from './components/FormExample';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/SingUp" element={<SignUp />} /> */}
        <Route path="/form-example" element={<FormExample />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
