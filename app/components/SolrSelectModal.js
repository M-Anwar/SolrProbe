// @flow
import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Dropdown, Grid, Table, Checkbox } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';

// Actions
import {actions as startupConfigLoaderActions} from '../reducers/startupConfigLoader';

type Props = {
    configPath: string,
    settings: Object,
    updateConfig: (key:string, value:Object) => void;
};

class SolrSelectModal extends Component<Props> {
  props: Props;
  getSolrUrlOptions: () => Array<Object>;
  getSolrInstanceTable: () => Any;
  
  constructor(props: Props){
      super(props);
      this.getSolrUrlOptions = this.getSolrUrlOptions.bind(this);
      this.getSolrInstanceTable = this.getSolrInstanceTable.bind(this);
  }

  getSolrUrlOptions():Array<Object> {   
    if(!this.props.settings.solrPaths){return []}
    return Object.entries(this.props.settings.solrPaths).map(
        ([key,val]) => {
            return {
                key: key,
                text: key,
                value: key,
                content: <Header as='h4' icon='searchengin' content={key} subheader={val} />
            } 
        }
    )
  }

  getSolrInstanceTable(){
    if(!this.props.settings.solrPaths){return []}
    return Object.entries(this.props.settings.solrPaths).map(
        ([key,val]) => {
            return (
                <Table.Row key={key}>  
                    <Table.Cell collapsing>
                        <Button size='mini' icon='trash' negative/>
                    </Table.Cell>                          
                    <Table.Cell>{key}</Table.Cell>
                    <Table.Cell>{val}</Table.Cell>                            
                </Table.Row>
            )
        }
    )
  }

  render() {   
    return (
        <div>   
            
            <Dropdown  
            floating                               
                placeholder='Select Solr URL'
                selection 
                options={this.getSolrUrlOptions()}
                header = "Solr Instance URLs"      
                style= {{width: '80%'}}          
            />   
            <Modal trigger={<Button attached='right' icon='configure' positive></Button>} closeIcon>
                <Header icon='configure' content='Solr Instance URLs' />
                <Modal.Content>
                    <p>
                        Manage your Solr instance URLs by adding/modifying/removing them below.
                    </p>                    

                    <Table celled compact definition color={'red'}>
                        <Table.Header fullWidth>
                            <Table.Row>   
                                <Table.HeaderCell/>                                                        
                                <Table.HeaderCell>Instance Name</Table.HeaderCell>
                                <Table.HeaderCell>Solr URL</Table.HeaderCell>                            
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.getSolrInstanceTable()}
                        </Table.Body>

                        <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='4'>
                                <Button floated='right' icon labelPosition='left' primary size='small'>
                                    <Icon name='searchengin' /> Add Instance
                                </Button>                            
                            </Table.HeaderCell>
                        </Table.Row>
                        </Table.Footer>
                    </Table>

                    Settings are saved to: <span> {this.props.configPath} </span>
                </Modal.Content>
                <Modal.Actions>                   
                    <Button color='red'>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green'>
                        <Icon name='checkmark' /> Apply
                    </Button>
                </Modal.Actions>
            </Modal>                
           

        </div>
        
     
    );
  }
}
function mapStateToProps(state){
    return {configPath: state.config.configPath, settings: state.config.settings}
  }

function mapDispatchToProps(dispatch: Dispatch<any>){
    return bindActionCreators({
      updateConfig:startupConfigLoaderActions.updateConfig
    }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SolrSelectModal);
