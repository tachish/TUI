import React from 'react';
import "./styles/index.scss";

import Button, { ButtonType, ButtonSize } from "./components/button/button";
import Alert, { AlertProps } from "./components/alert/alert";

const App: React.FC = () => {
  return (
    <div className="App">

      <Button
        btnType={ButtonType.Danger}
      >
        This is Button
      </Button>

      <Alert
        closable={true}
        type={"info"}
      >
        Success Text
      </Alert>
    </div>
  )
}

export default App;
