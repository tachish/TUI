import React from 'react';
import "./styles/index.scss";

import Button, { ButtonType, ButtonSize } from "./components/button/button";
import Alert, { AlertProps } from "./components/alert/alert";

import Menu from './components/menu/menu';
import MenuItem from './components/menu/menuItem';
import SubMenu from './components/menu/submenu';

const App: React.FC = () => {
  return (
    <div className="App">

      <Button
        btnType={ButtonType.Danger}
      >
        This is Button
      </Button>

      <br/>
      
      <Alert
        closable={true}
        type={"info"}
      >
        Success Text
      </Alert>

      <br/>

      <Menu 
        defaultIndex = {"0"} 
        mode={"vertical"}
        onSelect = {(index) => {
          console.log(index)
      }}>
        <MenuItem>
          this is 0
        </MenuItem>

        <MenuItem disabled>
          this is 1
        </MenuItem>

        <MenuItem>
          this is 2
        </MenuItem>


        <SubMenu
          title="dropdown"
        >
          <MenuItem>
            submenu 0
          </MenuItem>

          <MenuItem disabled>
            submenu 1
          </MenuItem>

          <MenuItem>
            submenu 2
          </MenuItem>
        </SubMenu>
      </Menu>

      <br/>


    </div>
  )
}

export default App;
