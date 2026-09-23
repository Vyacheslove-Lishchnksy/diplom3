"use client";

import { useEffect, useRef, useState } from "react";
import { useRTTTLStore } from "@/src/store/RTTTLStore";
import RTTTL from "@/src/scripts/RTTTL";
import { octaves, notes, initValue } from "@/src/configs/redactorConfig";

const RedactorApp = () => {
  const [body, setBody] = useState(initValue);
  const [hoveredCell, setHoveredCell] = useState<{ column: number; row: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const setCode = useRTTTLStore((store) => store.setCode);
  const labelWidth = 48;
  const cellWidth = 32;
  const cellHeight = 26;
  const rowCount = notes.length * octaves.length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const width = labelWidth + body.length * cellWidth;
    const height = rowCount * cellHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;

    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(devicePixelRatio, devicePixelRatio);

    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);
    context.font = "12px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";

    for (let row = 0; row < rowCount; row += 1) {
      const octave = 8 - Math.floor(row / notes.length);
      const note = notes.toReversed()[row % notes.length];
      const y = row * cellHeight;

      context.fillStyle = "#fff";
      context.fillRect(0, y, labelWidth, cellHeight);
      context.strokeStyle = "#d1d5db";
      context.strokeRect(0.5, y + 0.5, labelWidth - 1, cellHeight - 1);
      context.fillStyle = "#111";
      context.fillText(`${note}${octave}`, labelWidth / 2, y + cellHeight / 2);

      for (let column = 0; column < body.length; column += 1) {
        const x = labelWidth + column * cellWidth;
        const isSelected = body[column][row];
        const isHovered = hoveredCell?.column === column && hoveredCell.row === row;

        context.fillStyle = isSelected ? "#fff" : isHovered ? "#b4b4b4" : "#000";
        context.fillRect(x, y, cellWidth, cellHeight);
        context.strokeStyle = "#d1d5db";
        context.strokeRect(x + 0.5, y + 0.5, cellWidth - 1, cellHeight - 1);
      }
    }
  }, [body, hoveredCell, labelWidth, cellWidth, cellHeight, rowCount]);

  const getCell = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const bounds = canvas.getBoundingClientRect();
    const x = event.clientX - bounds.left - labelWidth;
    const y = event.clientY - bounds.top;
    const column = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);

    if (x < 0 || column >= body.length || row < 0 || row >= rowCount) return null;
    return { column, row };
  };

  return (
    <div
      className="w-full overflow-auto"
      style={{ height: "60%" }}
    >
      <canvas
        ref={canvasRef}
        role="grid"
        aria-label="RTTTL melody editor"
        style={{
          cursor: hoveredCell ? "pointer" : "default",
          userSelect: "none",
        }}
        onMouseMove={(event) => setHoveredCell(getCell(event))}
        onMouseLeave={() => setHoveredCell(null)}
        onMouseDown={(event) => {
          const cell = getCell(event);
          if (!cell) return;

          const newBody = body.map((column, columnIndex) =>
            column.map((selected, rowIndex) => {
              if (columnIndex !== cell.column) return selected;
              return rowIndex === cell.row ? !selected : false;
            }),
          );

          setCode(new RTTTL().getCode(newBody));
          setBody(newBody);
        }}
      />
    </div>
  );
};

export default RedactorApp;
