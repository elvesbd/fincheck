import { Routes, Route, BrowserRouter, } from 'react-router-dom';
import { AuthGuard } from './AuthGuard';
import { Login, Register, Dashboard } from '../view/pages';
import { AuthLayout } from '../view/Layouts/AuthLayout';

export function Router() {

  return (
   <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false}/>}>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Route>
        
        <Route element={<AuthGuard isPrivate/>}>
          <Route  path='/' element={<Dashboard />} />
        </Route>
      </Routes>
   </BrowserRouter>
  )
}