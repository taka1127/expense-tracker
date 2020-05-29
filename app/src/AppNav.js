import React, { Component } from 'react';
import { Nav,Navbar,NavItem,NavbarBrand,NavLink } from 'reactstrap';

class AppNav extends Component {
  state = {  }
  render() { 
    return (
      <div>
        <Navbar color="dark" dark  expand="md">
          <NavbarBrand href="/">かんたん経費アプリ</NavbarBrand>
          
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">ホーム</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/categories">カテゴリー</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/expenses">経費</NavLink>
              </NavItem>
            </Nav>
            
        </Navbar>
      </div>
    );
  }
}
 
export default AppNav;