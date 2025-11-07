import { Route, Routes } from 'react-router-dom'
import TrabajadorPage from './pages/TrabajadorPage.jsx'
import TrabajadorForm from './pages/TrabajadorForm.jsx'

import NotFound from './pages/NotFound.jsx'
import NavBar from './components/NavBar.jsx'

import { TrabajadorContextProvider } from './context/TrabajadorProvider.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
    return (
        <div className=''>
              <TrabajadorContextProvider>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<TrabajadorPage />} />
                        <Route path="/new" element={<TrabajadorForm />} />
                        <Route path="/EditTrabajador/:id" element={<TrabajadorForm />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
              </TrabajadorContextProvider>
        </div>
    );
}


export default App;