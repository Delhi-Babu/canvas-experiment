import React, { useEffect, useRef, useState } from "react";
import { ICanvasItem } from "../App";
import { MouseHandlerService } from "../Service/MouseHandlerService";
import { EShapeType, ETools } from "../constants";

interface IOwnProps {
  width: number;
  height: number;
  canvasItems: ICanvasItem[];
  setCanvasItems: React.Dispatch<React.SetStateAction<ICanvasItem[]>>;
  activeTool: ETools;
}

export const initialCanvasItem: ICanvasItem = {
  startPosition: { x: 0, y: 0 },
  endPosition: { x: 0, y: 0 },
  height: 0,
  width: 0,
  isSelected: false,
  position: { x: 0, y: 0 },
  type: EShapeType.NONE,
};

const Canvas = (props: IOwnProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height, canvasItems, activeTool, setCanvasItems } = props;
  const [drawingElement, setDrawingElement] = useState<ICanvasItem>({
    ...initialCanvasItem,
  });

  const renderShape = (
    renderItems: ICanvasItem[],
    clearCanvas: boolean = false
  ) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        if (clearCanvas) context.clearRect(0, 0, canvas.width, canvas.height);
        renderItems.forEach((item) => {
          switch (item.type) {
            case EShapeType.SQUARE:
              context.fillRect(
                item.startPosition.x,
                item.startPosition.y,
                item.width,
                item.height
              );
              break;
            case EShapeType.CIRCLE:
              context.beginPath();
              context.arc(
                item.startPosition.x,
                item.startPosition.y,
                item.width / 2,
                0,
                2 * Math.PI
              );
              context.fill();
              break;
            default:
              break;
          }
        });
      }
    }
  };

  useEffect(() => {
    renderShape(canvasItems, true);
    if (drawingElement.type !== EShapeType.NONE) renderShape([drawingElement]);
  }, [canvasItems, drawingElement]);
  return (
    <canvas
      ref={canvasRef}
      className="drawing-root-wrapper"
      width={width}
      height={height}
      onMouseMove={(e) =>
        MouseHandlerService.onMouseDragHandler(
          e,
          activeTool,
          canvasItems,
          setCanvasItems,
          canvasRef,
          drawingElement,
          setDrawingElement
        )
      }
      onMouseDown={(e) => {
        MouseHandlerService.onMouseDownHandler(
          e,
          activeTool,
          canvasItems,
          setCanvasItems,
          canvasRef,
          drawingElement,
          setDrawingElement
        );
      }}
      onMouseUp={(e) => {
        MouseHandlerService.onMouseUpHandler(
          e,
          activeTool,
          canvasItems,
          setCanvasItems,
          canvasRef,
          drawingElement,
          setDrawingElement
        );
      }}
    />
  );
};

export default Canvas;
