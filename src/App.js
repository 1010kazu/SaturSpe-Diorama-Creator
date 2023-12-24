import React, { Component } from "react";
import "./App.css";
import MapBoard from "./components/MapBoard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>SaturSpe Diorama Creator</h1>
        </header>
        <MapBoard />
      </div>
    );
  }
}

export default App;
