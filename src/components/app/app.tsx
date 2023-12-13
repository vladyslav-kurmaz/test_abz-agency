import Header from "../header/header";
import Main from "../main/main";
import Workers from "../workers/workers";
import Form from "../Form/Form";

import "./app.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Workers />
      <Form />
    </div>
  );
}

export default App;
