// Type declarations for @omnipanel modules (JavaScript without types)
declare module '@omnipanel/context/SceneContext' {
  import { ReactNode } from 'react';
  export const SceneProvider: React.FC<{ children: ReactNode }>;
  export const useScene: () => unknown;
}

declare module '@omnipanel/components/Scene' {
  export const Scene: React.FC;
}

declare module '@omnipanel/components/hud/TreeStatsHUD' {
  export const TreeStatsHUD: React.FC;
}

declare module '@omnipanel/components/NodeDetailSidebar' {
  export const NodeDetailSidebar: React.FC;
}

declare module '@omnipanel/App.css';
