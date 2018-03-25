import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BitOperations from "./apps/bit_operations.js";

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
          <Link to="/floating_point">Floating Point Numbers</Link>
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
      <Route path="/floating_point" component={FloatingPointNumbers} />
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

const FloatingPointNumbers = () => (
  <div>
    <h2>Floating Point Numbers</h2>
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

const HeapAllocator = ({ match }) => (
  <div>
    <h2>Heap Allocator</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default BasicExample;
