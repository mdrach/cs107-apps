import React from "react";

const HEAP_SIZE = 256; // bytes
const HEADER_SIZE = 8; // bytes
const ALIGNMENT = 8;

const WIDTH = 1000; // pixels
const HEIGHT = 600;
const HEAP_WIDTH = WIDTH * 0.95;
const HEAP_HEIGHT = HEIGHT * 0.10;
const HEAP_X = (WIDTH * 0.05) / 2;
const HEAP_Y = HEIGHT * 0.55;

const BYTE_WIDTH = HEAP_WIDTH / HEAP_SIZE;


const emptyHeap = () => (
  <rect 
    width={HEAP_WIDTH}
    height={HEAP_HEIGHT}
    x={HEAP_X}
    y={HEAP_Y}
    stroke="#111"
    stroke-width="3"
    fill="none"
  />
);

const blockHeader = (headerStart, blockSize) => (
    <rect
      width={BYTE_WIDTH * HEADER_SIZE}
      height={HEAP_HEIGHT}
      x={headerStart}
      y={HEAP_Y}
      stroke="#111"
      stroke-width="2"
      fill="none"
    />
);

const blockPayload = (headerStart, blockSize) => (
    <rect 
      width={BYTE_WIDTH * blockSize}
      height={HEIGHT * 0.10}
      x={headerStart + BYTE_WIDTH * HEADER_SIZE}
      y={HEIGHT * 0.55}
      stroke="#111"
      stroke-width="2"
      fill="none"
    />
);

const roundup = (x) => { return Math.ceil(x / ALIGNMENT) * ALIGNMENT; }


class HeapAllocator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockInfos: [{headerStartX: HEAP_X, roundedBlockSize: roundup(10)}]
    }
  }

  render() {
    return (
      <div>
        <h2>Heap Allocator</h2>
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={WIDTH} 
            height={HEIGHT} 
            style={{strokeWidth: "5px", backgroundColor: "#eee"}}>

          <path d="M30,150 L100,50" style={{
            stroke:"red", 
            strokeWidth: "10px", 
            fill: "none",
          }}/>

          {emptyHeap()}
          {this.state.blockInfos.map(
            (b) => blockHeader(b.headerStartX, b.roundedBlockSize)
          )}
          {this.state.blockInfos.map(
            (b) => blockPayload(b.headerStartX, b.roundedBlockSize)
          )}
        </svg>
      </div>
    );
  }
}


export default HeapAllocator;
