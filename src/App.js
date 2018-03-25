import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BitOperations from "./apps/bit_operations.js";
import FloatingPoint from "./apps/floating_point.js";
import HeapAllocator from "./apps/heap_allocator.js";

const BasicExample = () => (
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
          <Link to="/c_strings">C Strings</Link>
        </li>
        <li>
          <Link to="/assembly">Assembly</Link>
        </li>
        <li>
          <Link to="/heap_allocator">Heap Allocator</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/bit_operations" component={BitOperations} />
      <Route path="/floating_point" component={FloatingPoint} />
      <Route path="/c_strings" component={CStrings} />
      <Route path="/assembly" component={Assembly} />
      <Route path="/heap_allocator" component={HeapAllocator} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Welcome to CS107 Apps, a page with helpful visualizations for CS107 students</h2>
  </div>
);

const CStrings = () => (
  <div>
    <h2>C Strings</h2>
  </div>
);

const Assembly = () => (
  <div>
    <h2>Assembly</h2>
  </div>
);

export default BasicExample;
