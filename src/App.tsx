import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Container, Box, Group, Button } from '@mantine/core';
import { AtlasViewerPage } from './pages/AtlasViewerPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { HierarchicalViewPage } from './pages/HierarchicalViewPage';

function Navigation() {
  const location = useLocation();

  return (
    <Box py="md" style={{ borderBottom: '1px solid var(--mantine-color-dark-4)' }}>
      <Container size="100%">
        <Group justify="center" gap="md">
          <Button
            component={Link}
            to="/"
            variant={location.pathname === '/' ? 'filled' : 'light'}
            color={location.pathname === '/' ? 'blue' : 'gray'}
          >
            Atlas Viewer
          </Button>
          <Button
            component={Link}
            to="/comparison"
            variant={location.pathname === '/comparison' ? 'filled' : 'light'}
            color={location.pathname === '/comparison' ? 'blue' : 'gray'}
          >
            Agent Comparison
          </Button>
          <Button
            component={Link}
            to="/hierarchical"
            variant={location.pathname === '/hierarchical' ? 'filled' : 'light'}
            color={location.pathname === '/hierarchical' ? 'blue' : 'gray'}
          >
            Hierarchical View
          </Button>
        </Group>
      </Container>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<AtlasViewerPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/hierarchical" element={<HierarchicalViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
