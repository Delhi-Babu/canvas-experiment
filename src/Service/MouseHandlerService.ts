import { ICanvasItem } from "../App";
import { initialCanvasItem } from "../Canvas/Canvas";
import { EShapeType, ETools } from "../constants";

export class MouseHandlerService {
  static onMouseDownHandler(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    activeTool: ETools,
    canvasItems: ICanvasItem[],
    setCanvasItems: React.Dispatch<React.SetStateAction<ICanvasItem[]>>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    drawingElement: ICanvasItem,
    setDrawingElement: React.Dispatch<React.SetStateAction<ICanvasItem>>
  ) {
    const canvas = canvasRef.current;
    if (!canvas) return; // safe case
    if ([ETools.SQUARE, ETools.CIRCLE].includes(activeTool)) {
      setDrawingElement({
        ...drawingElement,
        startPosition: { x: e.clientX, y: e.clientY },
        endPosition: { x: e.clientX, y: e.clientY },
        width: 0,
        height: 0,
        type:
          activeTool === ETools.CIRCLE ? EShapeType.CIRCLE : EShapeType.SQUARE,
      });
    }
  }

  static onMouseDragHandler(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    activeTool: ETools,
    canvasItems: ICanvasItem[],
    setCanvasItems: React.Dispatch<React.SetStateAction<ICanvasItem[]>>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    drawingElement: ICanvasItem,
    setDrawingElement: React.Dispatch<React.SetStateAction<ICanvasItem>>
  ) {
    const canvas = canvasRef.current;

    if (!canvas) return; // safe case
    const { startPosition } = drawingElement;
    if (drawingElement.type !== EShapeType.NONE) {
      const endPosition = { x: e.clientX, y: e.clientY };

      const width = endPosition.x - startPosition.x;
      const height = endPosition.y - startPosition.y;

      switch (activeTool) {
        case ETools.SQUARE:
          setDrawingElement({ ...drawingElement, endPosition, width, height });
          break;
        case ETools.CIRCLE:
          {
            const circleWidth = Math.abs(
              startPosition.x - width / 2 - endPosition.x - width / 2
            );
            const circleHeight = Math.abs(
              startPosition.y - height / 2 - endPosition.y - height / 2
            );
            setDrawingElement({
              ...drawingElement,
              endPosition,
              width: circleWidth,
              height: circleHeight,
              // startPosition: newStartPosition,
            });
          }
          break;
        default:
          break;
      }
    }
  }

  static onMouseUpHandler(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    activeTool: ETools,
    canvasItems: ICanvasItem[],
    setCanvasItems: React.Dispatch<React.SetStateAction<ICanvasItem[]>>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    drawingElement: ICanvasItem,
    setDrawingElement: React.Dispatch<React.SetStateAction<ICanvasItem>>
  ) {
    console.log("the stuff is herer", drawingElement.type);
    if (drawingElement.type !== EShapeType.NONE) {
      debugger;
      setCanvasItems([...canvasItems, { ...drawingElement }]);
      setDrawingElement({ ...initialCanvasItem });
    }
  }
}
