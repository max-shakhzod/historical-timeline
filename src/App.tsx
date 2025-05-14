import timelineData from './data/timelineData';
import TimelineDates from './components/TimelineDates';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <TimelineDates timelineData={timelineData} />
      </div>
    </div>
  );
}

export default App;