declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps & { width?: number | string; height?: number | string; }>;
  export default content;
}


