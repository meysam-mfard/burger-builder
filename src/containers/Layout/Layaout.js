import React, {Component} from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {

  state = {
    showSidedrawer: false
  };

  sidedrawerCloseHandler = () => {
    this.setState({showSidedrawer: false});
  };

  sidedrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSidedrawer: !prevState.showSidedrawer}
    } );
  };

  render() {
    return (
      <>
        <Sidedrawer open={this.state.showSidedrawer} close={this.sidedrawerCloseHandler}/>
        <Toolbar drawerToggleClicked={this.sidedrawerToggleHandler}/>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </>
    )
  }
}

export default Layout;
