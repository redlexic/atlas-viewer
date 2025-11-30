import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core'
import { SceneProvider } from './context/SceneContext'
import { Scene } from './components/Scene'
import { BottomHUD } from './components/hud/BottomHUD'
import { TreeStatsHUD } from './components/hud/TreeStatsHUD'
import { NodeDetailSidebar } from './components/NodeDetailSidebar'
import { Navigation } from './components/Navigation'
import { GridPage } from './pages/GridPage'
import './App.css'
import '@mantine/core/styles.css'

const theme = createTheme({
  primaryColor: 'blue',
});

function OriginalApp() {
  return (
    <SceneProvider>
      <TreeStatsHUD />
      <NodeDetailSidebar />
      <div className="app">
        <div className="scene-container">
          <Scene />
        </div>

        <BottomHUD />
      </div>
    </SceneProvider>
  )
}

function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<OriginalApp />} />
          <Route path="/grid" element={<GridPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App