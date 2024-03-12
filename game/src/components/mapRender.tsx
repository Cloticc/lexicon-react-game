import '../css/MapRender.css';

import { useState } from 'react';

type MapRenderProps = {
  initialMapData: string[][];
};

export function MapRender({ initialMapData }: MapRenderProps) {
  const [mapData, setMapData] = useState(initialMapData);

  if (!mapData) {
    return <div>Loading...</div>;
  }

  const getClassNameForSymbol = (symbol: string) => {
    switch (symbol) {
      case '-': return 'empty';
      // case 'P': return 'player';
      case 'B': return 'boxed';
      case ',': return 'ground';
      case 'I': return 'indicator';
      case '#': return 'wall';
      default: return '';
    }
  };

  return (
    <div className="grid">
      {mapData.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((column, columnIndex) => (
            <div key={columnIndex} className={`cell ${getClassNameForSymbol(column)}`}>{column}</div>
          ))}
        </div>
      ))}
    </div>
  );
}