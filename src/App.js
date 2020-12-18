import './App.css';
import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Text } from "react-konva";

function App() {
    const [tool, setTool] = useState("pen");
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];

        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => (isDrawing.current = false);

    return (
        <div className="App">
          <div className="stage-container">
            <Stage
                width={300}
                height={300}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <Layer>
                    <Text text="Just start drawing" x={5} y={30}></Text>
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke="#df4b26"
                            strokeWidth={5}
                            tension={0.5}
                            lineCap="round"
                            // globalCompositeOperation={
                            //     line.tool === "eraser"
                            //         ? "destination-out"
                            //         : "source-over"
                            // }
                        />
                    ))}
                </Layer>
            </Stage>
          </div>
            {/* <select value={tool} onChange={(e) => setTool(e.target.value)}>
                <option value="pen">Pen</option>
                <option value="eraser">Eraser</option>
            </select> */}
        </div>
    );
}

export default App;
