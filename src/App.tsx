import qbankLogo from "./assets/qbank-logo.webp";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://qbankdam.com" target="_blank">
          <img src={qbankLogo} className="logo" alt="QBank logo" />
        </a>
      </div>
      <h1>
        React Starwars <span className="text-primary">Take-home</span>{" "}
        Assignment
      </h1>
      <div className="card">
        <p>
          You can find the assignment instructions in <code>README.md</code>.
        </p>
        <h2>Good luck!</h2>
      </div>
    </>
  );
}

export default App;
