import React from 'react';
import "./styles/index.scss";

import Button, { ButtonType, ButtonSize } from "./components/button/button";
import Alert from "./components/alert/alert";

import Menu from './components/menu/menu';
import MenuItem from './components/menu/menuItem';
import SubMenu from './components/menu/submenu';
import Input, { DefaultInput, ControlledInput } from "./components/input/input";

import { Container, Aside, Header, Main, Footer } from './components/layout/layout';
import Avator from './components/avatar/avatar';

import Badge from './components/badge/badge';
import imgURL from "./static/img.jpg";
const App: React.FC = () => {
  return (
    <div className="App">

      <Button
        btnType={ButtonType.Danger}
        size={ButtonSize.Large}
      >
        This is Button
      </Button>

      <br />

      <Alert
        closable={true}
        type={"info"}
      >
        Success Text
      </Alert>

      <br />

      <Menu
        defaultIndex={"0"}
        mode={"vertical"}
        onSelect={(index) => {
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

      <br />

      <Container prefixCls="Container">
        <Header prefixCls="Header">
          Header
        </Header>
        <Container prefixCls="Container">
          <Aside prefixCls="Aside" sideOption={2}>
            Left side
          </Aside>
          <Main prefixCls="Main">
            Main
          </Main>
          <Aside prefixCls="Aside" sideOption={1}>
            Right Side
          </Aside>
        </Container>
        <Footer prefixCls="Footer">
          Footer
          </Footer>
      </Container>

      <br/>
      <Input style={{width: "300px"}} prepend="https://" append=".com">
      </Input>

      <DefaultInput></DefaultInput>
      <ControlledInput style={{width: "300px"}}></ControlledInput>
    
      <Badge
        content={"Logout"}
      >
        <Avator
          src={imgURL}
          size={"lg"}
          shape={'circle'}
        >
        </Avator>
      </Badge>

      <br/>
      <br/>

      <Badge
        counter={10}
        offsetX={10}
        offsetY={-10}
      >
        <Avator
          size={"sm"}
          shape={'square'}
        >
        </Avator>
      </Badge>
      
      <br/> <br/>

      <Badge
        counter={10}
        overflowNum={6}
      >
        <Avator
          src={imgURL}
          size={"default"}
          shape={'circle'}
        >
        </Avator>
      </Badge>

      <Badge
      >
        <Avator
          src={imgURL}
          size={"default"}
          shape={'circle'}
        >
        </Avator>
      </Badge>
    </div>
  )
}

export default App;
