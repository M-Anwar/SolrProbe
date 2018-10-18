// @flow
import React, { Component } from 'react';
import { Input, Button, Header, Icon, Modal, Dropdown, Grid, Table, Checkbox } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';
import { LocalStore } from '../localStore'; 

// Actions
import {actions as solrInstanceActions} from '../reducers/solrInstancesReducer';

type Props = {
    instances: Object,
    writeInstances: (allInstances:Object) => void;
};

type State = {
    invalid: boolean
}

class SolrSelectModal extends Component<Props, State> {
  props: Props;
  state: State;
  getSolrUrlOptions: () => Array<Object>;
  getSolrInstanceTable: () => any;
  onAddInstance:() => void;
  
  constructor(props: Props){
      super(props);
      this.state = { invalid: true}
      this.getSolrUrlOptions = this.getSolrUrlOptions.bind(this);
      this.getSolrInstanceTable = this.getSolrInstanceTable.bind(this);
      this.onAddInstance = this.onAddInstance.bind(this);
  }

  getSolrUrlOptions():Array<Object> {   
    if(!this.props.instances){return []}
    return Object.entries(this.props.instances).map(
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

  getSolrInstanceTable():any{
    if(!this.props.instances){return []}
    return Object.entries(this.props.instances).map(
        ([key,val]) => {
            return (
                <Table.Row key={key}>  
                    <Table.Cell collapsing>
                        <Button size='mini' icon='trash' negative/>
                    </Table.Cell>                          
                    <Table.Cell><Input fluid defaultValue={key}/></Table.Cell>
                    <Table.Cell><Input fluid defaultValue={val}/></Table.Cell>                            
                </Table.Row>
            )
        }
    )
  }

  onAddInstance(){
    console.log("add clicked")
  }

  render() {   
    const { invalid } = this.state
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
                                <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.onAddInstance}>
                                    <Icon name='searchengin' /> Add Instance
                                </Button>                            
                            </Table.HeaderCell>
                        </Table.Row>
                        </Table.Footer>
                    </Table>

                    Settings are saved to: <span> {LocalStore.path} </span>
                </Modal.Content>
                <Modal.Actions>                   
                    <Button color='red'>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' disabled={invalid}>
                        <Icon name='checkmark' /> Apply
                    </Button>
                </Modal.Actions>
            </Modal>                
           

        </div>
        
     
    );
  }
}
function mapStateToProps(state){
    return {instances: state.solrInstances.instances}
  }

function mapDispatchToProps(dispatch: Dispatch<any>){
    return bindActionCreators({
      writeInstances:solrInstanceActions.writeInstances
    }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SolrSelectModal);
