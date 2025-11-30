import { useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Title, 
  Switch, 
  Group, 
  Text,
  ColorPicker,
  Stack,
  Button,
  Badge
} from '@mantine/core';
import { InteractiveGrid } from './InteractiveGrid';

export function GridExample() {
  const [orthographic, setOrthographic] = useState(false);
  const [showBorder, setShowBorder] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [selectedTiles, setSelectedTiles] = useState(new Set());
  const [customColors, setCustomColors] = useState({});
  const [paintColor, setPaintColor] = useState('#ff0000');

  const handleTileClick = (tileId, tile, isClicked) => {
    console.log(`Tile ${tileId} ${isClicked ? 'selected' : 'deselected'}`);
    setSelectedTiles(prev => {
      const newSet = new Set(prev);
      if (isClicked) {
        newSet.add(tileId);
      } else {
        newSet.delete(tileId);
      }
      return newSet;
    });
  };

  const paintTile = (tileId) => {
    setCustomColors(prev => ({
      ...prev,
      [tileId]: paintColor
    }));
  };

  const clearColors = () => {
    setCustomColors({});
  };

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">Interactive Grid in Mantine</Title>
      
      <Grid>
        {/* Controls */}
        <Grid.Col span={4}>
          <Paper p="md" withBorder>
            <Stack spacing="md">
              <Title order={3}>Controls</Title>
              
              <Switch
                label="Orthographic Camera"
                checked={orthographic}
                onChange={(e) => setOrthographic(e.currentTarget.checked)}
              />
              
              <Switch
                label="Show Border"
                checked={showBorder}
                onChange={(e) => setShowBorder(e.currentTarget.checked)}
              />
              
              <div>
                <Text size="sm" mb="xs">Rotation: {rotation.toFixed(1)}°</Text>
                <input
                  type="range"
                  min={0}
                  max={Math.PI * 2}
                  step={0.1}
                  value={rotation}
                  onChange={(e) => setRotation(parseFloat(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div>
                <Text size="sm" mb="xs">Scale: {scale.toFixed(1)}x</Text>
                <input
                  type="range"
                  min={0.5}
                  max={3}
                  step={0.1}
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <Text size="sm" mb="xs">Paint Color</Text>
                <ColorPicker
                  value={paintColor}
                  onChange={setPaintColor}
                  size="sm"
                />
              </div>

              <Group spacing="xs">
                <Button
                  size="xs"
                  onClick={() => {
                    selectedTiles.forEach(tileId => paintTile(tileId));
                  }}
                  disabled={selectedTiles.size === 0}
                >
                  Paint Selected ({selectedTiles.size})
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={clearColors}
                >
                  Clear Colors
                </Button>
              </Group>
            </Stack>
          </Paper>
          
          <Paper p="md" withBorder mt="md">
            <Title order={4} mb="xs">Selected Tiles</Title>
            <Group spacing="xs">
              {Array.from(selectedTiles).map(tileId => (
                <Badge key={tileId} size="sm">
                  {tileId}
                </Badge>
              ))}
              {selectedTiles.size === 0 && (
                <Text size="sm" c="dimmed">Click tiles to select them</Text>
              )}
            </Group>
          </Paper>
        </Grid.Col>
        
        {/* Grid Components */}
        <Grid.Col span={8}>
          <Grid>
            <Grid.Col span={6}>
              <Paper p="md" withBorder>
                <Title order={4} mb="md">Small Grid (300x250)</Title>
                <InteractiveGrid
                  width={300}
                  height={250}
                  orthographic={orthographic}
                  showBorder={showBorder}
                  rotation={rotation}
                  scale={scale}
                  tileColors={customColors}
                  onTileClick={handleTileClick}
                />
              </Paper>
            </Grid.Col>
            
            <Grid.Col span={6}>
              <Paper p="md" withBorder>
                <Title order={4} mb="md">Medium Grid (350x300)</Title>
                <InteractiveGrid
                  width={350}
                  height={300}
                  orthographic={!orthographic} // Opposite camera for comparison
                  showBorder={showBorder}
                  rotation={rotation}
                  scale={scale}
                  tileColors={customColors}
                  onTileClick={handleTileClick}
                />
              </Paper>
            </Grid.Col>
            
            <Grid.Col span={12}>
              <Paper p="md" withBorder>
                <Title order={4} mb="md">Large Grid (700x400)</Title>
                <InteractiveGrid
                  width={700}
                  height={400}
                  orthographic={orthographic}
                  showBorder={showBorder}
                  rotation={rotation}
                  scale={scale}
                  tileColors={customColors}
                  onTileClick={handleTileClick}
                />
              </Paper>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
}