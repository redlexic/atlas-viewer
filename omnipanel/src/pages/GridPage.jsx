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
  Badge,
  Card,
  SimpleGrid,
  Divider,
  ActionIcon,
  Tooltip
} from '@mantine/core';
import { InteractiveGrid } from '../components/portable/InteractiveGrid';

export function GridPage() {
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

  const presetColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

  return (
    <Container size="xl" py="xl" style={{ overflowX: 'auto', minWidth: '100%' }}>
      <Title order={1} mb="xl" ta="center">Interactive 3D Grid Components</Title>
      <Text size="lg" c="dimmed" ta="center" mb="xl">
        Portable Three.js grid components that work seamlessly within Mantine layouts
      </Text>
      
      <Grid>
        {/* Left Column - Controls and Info */}
        <Grid.Col span={4}>
          <Stack spacing="md">
            <Card withBorder p="md">
              <Title order={3} mb="md">Grid Controls</Title>
              
              <Stack spacing="sm">
                <Group justify="space-between">
                  <Text size="sm">Orthographic Camera</Text>
                  <Switch
                    checked={orthographic}
                    onChange={(e) => setOrthographic(e.currentTarget.checked)}
                  />
                </Group>
                
                <Group justify="space-between">
                  <Text size="sm">Show Border</Text>
                  <Switch
                    checked={showBorder}
                    onChange={(e) => setShowBorder(e.currentTarget.checked)}
                  />
                </Group>
                
                <Divider />
                
                <div>
                  <Text size="sm" mb="xs">Rotation: {(rotation * 180 / Math.PI).toFixed(1)}°</Text>
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
              </Stack>
            </Card>

            <Card withBorder p="md">
              <Title order={4} mb="md">Paint Tools</Title>
              <Stack spacing="sm">
                <div>
                  <Text size="sm" mb="xs">Paint Color</Text>
                  <Group spacing="xs" mb="sm">
                    {presetColors.map(color => (
                      <ActionIcon
                        key={color}
                        variant={paintColor === color ? "filled" : "outline"}
                        style={{ backgroundColor: color, borderColor: color }}
                        onClick={() => setPaintColor(color)}
                      >
                      </ActionIcon>
                    ))}
                  </Group>
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
            </Card>
            
            <Card withBorder p="md">
              <Title order={4} mb="xs">Selected Tiles</Title>
              <Group spacing="xs">
                {Array.from(selectedTiles).map(tileId => (
                  <Badge key={tileId} size="sm" variant="light">
                    {tileId}
                  </Badge>
                ))}
                {selectedTiles.size === 0 && (
                  <Text size="sm" c="dimmed">Click tiles to select them</Text>
                )}
              </Group>
            </Card>

            <Card withBorder p="md">
              <Title order={4} mb="md">Component Features</Title>
              <Stack spacing="xs">
                <Text size="sm">✅ Container-aware responsive sizing</Text>
                <Text size="sm">✅ Interactive tile selection</Text>
                <Text size="sm">✅ Smooth animations</Text>
                <Text size="sm">✅ Orthographic/Perspective cameras</Text>
                <Text size="sm">✅ Custom tile colors</Text>
                <Text size="sm">✅ Mantine integration</Text>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
        
        {/* Right Column - Grid Demos */}
        <Grid.Col span={8}>
          <Stack spacing="md">
            {/* Small Grids Row */}
            <SimpleGrid cols={2} spacing="md">
              <Card withBorder p="md">
                <Group justify="space-between" mb="md">
                  <Title order={4}>Perspective View</Title>
                  <Badge variant="light" color="blue">300×200</Badge>
                </Group>
                <InteractiveGrid
                  width={300}
                  height={200}
                  orthographic={false}
                  showBorder={showBorder}
                  rotation={rotation}
                  scale={scale}
                  tileColors={customColors}
                  onTileClick={handleTileClick}
                />
              </Card>
              
              <Card withBorder p="md">
                <Group justify="space-between" mb="md">
                  <Title order={4}>Orthographic View</Title>
                  <Badge variant="light" color="green">300×200</Badge>
                </Group>
                <InteractiveGrid
                  width={300}
                  height={200}
                  orthographic={true}
                  showBorder={showBorder}
                  rotation={rotation}
                  scale={scale}
                  tileColors={customColors}
                  onTileClick={handleTileClick}
                />
              </Card>
            </SimpleGrid>
            
            {/* Medium Grid */}
            <Card withBorder p="md">
              <Group justify="space-between" mb="md">
                <Title order={4}>Medium Grid - Dynamic Camera</Title>
                <Badge variant="light" color="purple">600×350</Badge>
              </Group>
              <InteractiveGrid
                width={600}
                height={350}
                orthographic={orthographic}
                showBorder={showBorder}
                rotation={rotation}
                scale={scale}
                tileColors={customColors}
                onTileClick={handleTileClick}
              />
            </Card>
            
            {/* Large Grid */}
            <Card withBorder p="md">
              <Group justify="space-between" mb="md">
                <Title order={4}>Large Grid - Full Control</Title>
                <Badge variant="light" color="orange">700×400</Badge>
              </Group>
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
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}