class Header extends React.Component {
  render() {
    return <p>Header Coming Soon</p>;
  }
}

class UploadFile extends React.Component {
  render() {
    return (
      <div>
        <p>Drag Drop File Input</p>
      </div>
    );
  }
}

class HistoryList extends React.Component {
  render() {
    return (
      <div>
        <h2>History</h2>
        <ul>
          <li>last report rendered</li>
        </ul>
      </div>
    );
  }
}

class Transcript extends React.Component {
  render() {
    return (
      <div>
        <p>Transcript Coming Soon</p>
      </div>
    );
  }
}

class Analytics extends React.Component {
  render() {
    return (
      <div>
        <p>Analytics</p>
      </div>
    );
  }
}

const jsx = (
  <div>
    <Header />
    <UploadFile />
    <HistoryList />
    <Transcript />
    <Analytics />
  </div>
);

ReactDOM.render(jsx, document.getElementById("app"));
