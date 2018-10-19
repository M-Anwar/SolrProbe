// @flow
import React, { Component } from 'react';
import { Input, Button, Header, Icon, Modal, Dropdown, Grid, Table, Checkbox } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';
import { LocalStore } from '../localStore'; 
import uuid4 from 'uuid';

// Actions
import {actions as solrInstanceActions} from '../reducers/solrInstancesReducer';

type Props = {
    instances: Array<{id:string, name:string, url:string}>,
    flushInstances: () => void,
    addInstance:() => void,
    deleteInstance: (id:string) => void,
    modifyInstance: (id:string, name:string, url:string) => void
};

type State = {
    open:boolean
}

class SolrSelectModal extends Component<Props, State> {
    props: Props;
    state: State;
    getSolrUrlOptions: () => Array<Object>;
    getSolrInstanceTable: () => any;    
    onNameChange:(id:string, newName:string, url:string) => void;
    onUrlChange:(id:string, name:string, newUrl:string) => void; 
    close: () => void;
    open: () => void;

    constructor(props: Props){
        super(props);        
        this.state = {open:false}
        this.getSolrUrlOptions = this.getSolrUrlOptions.bind(this);
        this.getSolrInstanceTable = this.getSolrInstanceTable.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);          
        this.close = this.close.bind(this);  
        this.open = this.open.bind(this);
    }

    getSolrUrlOptions(): Array<Object> {   
        return this.props.instances.map( instance => ({          
            key: instance.id,
            text: instance.name,
            value: instance.id,
            content: <Header as='h4' icon='searchengin' content={instance.name} subheader={instance.url} />
        })
    )}  

    getSolrInstanceTable(): any{  
        return this.props.instances.map( (instance,idx) => (
            <Table.Row key={idx}>  
                <Table.Cell collapsing>
                    <Button size='mini' icon='trash' negative onClick={()=>this.props.deleteInstance(instance.id)}/>
                </Table.Cell>                          
                <Table.Cell><Input fluid value={instance.name} onChange={(event,data)=> this.onNameChange(instance.id, data.value, instance.url) }/></Table.Cell>
                <Table.Cell><Input fluid value={instance.url} onChange={(event,data)=> this.onNameChange(instance.id, instance.name, data.value) }/></Table.Cell>                            
            </Table.Row>
        ))   
    }  

    onNameChange(id:string, newName:string, url:string){
        this.props.modifyInstance(id, newName, url)
    }
    onUrlChange(id:string, name:string, newUrl:string){
        this.props.modifyInstance(id, name, newUrl)
    }

    close(){        
        this.props.flushInstances();
        this.setState({open:false})
    }
    open(){       
        this.setState({open:true})
    }

    render() {          
        const {open} = this.state;        
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
                <Modal trigger={<Button attached='right' icon='configure' positive/>} open={open} onOpen={this.open} onClose={this.close} closeIcon>
                    <Header icon='configure' content='Solr Instance URLs' />
                    <Modal.Content>
                        <p>
                            Manage your Solr instance URLs by adding/modifying/removing them below.
                        </p>                    

                        <Table celled compact definition color="red">
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
                                    <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.props.addInstance}>
                                        <Icon name='searchengin' /> Add Instance
                                    </Button>                            
                                </Table.HeaderCell>
                            </Table.Row>
                            </Table.Footer>
                        </Table>

                        Settings are saved to: <span> {LocalStore.path} </span>
                    </Modal.Content>
                    <Modal.Actions>                         
                        <Button color='green' onClick={this.close}>
                            <Icon name='checkmark' /> Close
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
        flushInstances: solrInstanceActions.flushInstances,
        addInstance: solrInstanceActions.addInstance,
        deleteInstance: solrInstanceActions.deleteInstance,
        modifyInstance: solrInstanceActions.modifyInstance
    }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SolrSelectModal);
