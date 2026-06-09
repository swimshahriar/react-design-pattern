import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CompoundPattern from './pages/CompoundPattern'
import HOCPattern from './pages/HOCPattern'
import RenderPropsPattern from './pages/RenderPropsPattern'
import HooksPattern from './pages/HooksPattern'
import ContainerPresentational from './pages/ContainerPresentational'
import ProviderPattern from './pages/ProviderPattern'
import ControlledUncontrolled from './pages/ControlledUncontrolled'
import ObserverPattern from './pages/ObserverPattern'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/compound" element={<CompoundPattern />} />
        <Route path="/hoc" element={<HOCPattern />} />
        <Route path="/render-props" element={<RenderPropsPattern />} />
        <Route path="/hooks" element={<HooksPattern />} />
        <Route path="/container-presentational" element={<ContainerPresentational />} />
        <Route path="/provider" element={<ProviderPattern />} />
        <Route path="/controlled" element={<ControlledUncontrolled />} />
        <Route path="/observer" element={<ObserverPattern />} />
      </Route>
    </Routes>
  )
}