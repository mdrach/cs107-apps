import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";
import 'react-select/dist/react-select.css';

import BitOperations from "./apps/bit_operations.js";
import FloatingPoint from "./apps/floating_point.js";
import HeapAllocator from "./apps/heap_allocator.js";
import AssemblyStackFrame from "./apps/assembly_stack_frame.js";
import StackAndHeap from "./apps/stack_and_heap.js";

const AppRoot = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/bit_operations">Bit Operations</Link>
        </li>
        <li>
          <Link to="/floating_point">Floating Points</Link>
        </li>
        <li>
          <Link to="/stack_and_heap">Stack and Heap</Link>
        </li>
        <li>
          <Link to="/assembly_stack_frame">Assembly Stack Frame</Link>
        </li>
        <li>
          <Link to="/heap_allocator">Heap Allocator</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/bit_operations" component={BitOperations} />
      <Route path="/floating_point" component={FloatingPoint} />
      <Route path="/stack_and_heap" component={StackAndHeap} />
      <Route path="/assembly_stack_frame" component={AssemblyStackFrame} />
      <Route path="/heap_allocator" component={HeapAllocator} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Welcome to CS107 Apps, a page with helpful visualizations for CS107 students</h2>
  </div>
);

export default AppRoot;
