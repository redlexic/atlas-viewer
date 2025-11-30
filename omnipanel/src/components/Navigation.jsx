import { Group, Button } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  
  return (
    <Group spacing="xs" p="md" style={{ borderBottom: '1px solid #e0e0e0' }}>
      <Button
        component={Link}
        to="/"
        variant={location.pathname === '/' ? 'filled' : 'subtle'}
        size="sm"
      >
        Original Demo
      </Button>
      <Button
        component={Link}
        to="/grid"
        variant={location.pathname === '/grid' ? 'filled' : 'subtle'}
        size="sm"
      >
        Portable Grid
      </Button>
    </Group>
  );
}