// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import type {Dispatch} from 'redux';
import { Grid, Statistic, Header, Container, Progress, Divider, Button, Dropdown, Menu, Image } from 'semantic-ui-react';
import SolrSelectModal from '../components/SolrSelectModal';

// Actions
import {actions as testActions} from '../reducers/test';

type Props = {  
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
    this.props.testAction("Hello World")
  }

  render() {        
    return (
      <div> 
        <Container textAlign='center'>
          <Header as='h2'>
            <Image circular src='./res/images/128x128.png' /> Solr Probe
          </Header>
          <SolrSelectModal/>                  
        
          <Divider/>
        
          <Grid columns={2} style={{margin:"40px"}}>
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
          </Grid>    
        </Container>  
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>){
  return bindActionCreators({
    ...testActions
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(HomePage);