import "./App.css";
import BarGraphSimple from "./BarGraphSimple";
import BAR_GRAPH_SIMPLE_DATA from "./BarGraphSimpleData";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bar Graph Simple Example</h1>
        <BarGraphSimple data={BAR_GRAPH_SIMPLE_DATA} />
      </header>
    </div>
  );
};

export default App;
