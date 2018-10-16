// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'semantic-ui-react';
import type {Dispatch} from 'redux';

// Actions
import {actions as testActions} from '../reducers/test';

type Props = { 
  configPath:string,
  settings:Object,
  testAction: (string) => void
};

class HomePage extends Component<Props> {
  onClick: ()=> void;
  props: Props;

  constructor(props: Props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(){   
    this.props.testAction(this.props.configPath)
  }

  render() {        
    return (
      <div>
        <Button onClick={this.onClick}> {this.props.configPath} </Button>
        <br/>
        <span>
          {JSON.stringify(this.props.settings)}
        </span>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {configPath: state.config.configPath, settings: state.config.settings}
}
function mapDispatchToProps(dispatch: Dispatch<any>){
  return bindActionCreators({
    ...testActions
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);