// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import type {Dispatch} from 'redux';
import { Grid, Header, Statistic, Progress, Divider, Button, Dropdown, Menu } from 'semantic-ui-react';

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
        <Header as='h1'>Solr Cloud Instances</Header>        
        <br/>
        <span>
          {JSON.stringify(this.props.settings)}
        </span>

        {/* <Grid columns={2}>
          <Grid.Row centered columns={3}>
            <Grid.Column textAlign='center'>          
              <Statistic size='mini'>
                <Statistic.Value>11.91GB / 32.32GB</Statistic.Value>
                <Statistic.Label>Physical Memory</Statistic.Label>
                <Divider />
                <Statistic.Label><Progress percent={90} progress indicating/></Statistic.Label>
              </Statistic>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Statistic size='mini'>
                <Statistic.Value>392 / 4096</Statistic.Value>
                <Statistic.Label>File Descriptors</Statistic.Label>
                <Divider />
                <Statistic.Label><Progress percent={90} progress indicating/></Statistic.Label>
              </Statistic>
            </Grid.Column>  

            <Grid.Column textAlign='center'>
              <Statistic size='mini'>
                <Statistic.Value>11.91GB / 32.32GB</Statistic.Value>
                <Statistic.Label>Physical Memory</Statistic.Label>
                <Divider />
                <Statistic.Label><Progress percent={90} progress indicating/></Statistic.Label>
              </Statistic>
            </Grid.Column> 
          </Grid.Row>            
        </Grid>  */}

        <h1>Solr Cloud Instances</h1>
       
        
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