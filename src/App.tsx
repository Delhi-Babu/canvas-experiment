import React, { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./Canvas/Canvas";
import Toolbar from "./Toolbar/Toolbar";
import { EShapeType, ETools } from "./constants";

export interface IDimension {
  width: number;
  height: number;
}

export interface ICanvasItem {
  position: { x: number; y: number };
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  isSelected: boolean;
  type: EShapeType;
  width: number;
  height: number;
}

function App() {
  const [dimension, setDimension] = useState<IDimension>({
    width: 0,
    height: 0,
  });

  const [activeTool, setActiveTool] = useState<ETools>(ETools.POINTER);

  const [canvasItems, setCanvasItems] = useState<ICanvasItem[]>([]);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <div className="canvas-wrapper">
      <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />
      <Canvas
        width={dimension.width}
        height={dimension.height}
        activeTool={activeTool}
        canvasItems={canvasItems}
        setCanvasItems={setCanvasItems}
      />
    </div>
  );
}

export default App;
