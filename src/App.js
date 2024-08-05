import { Tree, TreeN } from './Tree/Tree';
import data from './data.json';

function App() {
  return (
    <div>
      <Tree data={data} />
    </div>
  );
}

export default App;
