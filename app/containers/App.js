// @flow
import * as React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import routes from '../constants/routes';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';

// Actions
import {actions as startupConfigLoaderActions} from '../reducers/startupConfigLoader';

type Props = {
  children: React.Node;
  history: Object;
  location: Object;
  match: Object;
  loadConfig: () => void;  
};

type State = {
  expanded: boolean; 
}

class App extends React.Component<Props, State> {
  props: Props;
  state = {
    expanded:false
  }

  componentDidMount(){    
    this.props.loadConfig();
  }

  onSelect = (selected: string) => {   
    if(this.props.location.pathname !== selected){
      this.props.history.push(selected);
    }    
  };
  onToggle = (expanded: boolean) => {
      this.setState({ expanded: expanded });
  };

  render() {
    const { children } = this.props;
    const { expanded } = this.state;       
    return (
      <React.Fragment>         
        <div>
          <div style={{
                        marginLeft: expanded ? 240 : 64,
                        padding: '15px 20px 0 20px'
                    }}>
            {children} 
          </div>
          <div>
            <SideNav onSelect={this.onSelect} onToggle={this.onToggle} style={{position:'fixed'}}>
              <SideNav.Toggle/>
              <SideNav.Nav selected={this.props.location.pathname}>     
                <NavItem eventKey={routes.HOME}>
                  <NavIcon>
                      <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                      Solr Home
                  </NavText>
                </NavItem> 
                <NavItem eventKey={routes.QUERY}>
                  <NavIcon>
                      <i className="fa fa-fw fa-search" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                  </NavIcon>
                  <NavText>
                      Query Analysis
                  </NavText>
                </NavItem> 
                <NavItem eventKey={routes.ABOUT}>
                  <NavIcon>
                      <i className="fa fa-fw fa-info" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                  </NavIcon>
                  <NavText>
                      About
                  </NavText>
                </NavItem>         
              </SideNav.Nav>
            </SideNav>
          </div>         
        </div>      
       
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>){
  return bindActionCreators({
    loadConfig:startupConfigLoaderActions.loadConfig
  }, dispatch)
}

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(App);