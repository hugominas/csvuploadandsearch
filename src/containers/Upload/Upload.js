import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    Jumbotron,
    Grid,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap';

import {debounce} from 'lodash';
import {selectUpload} from './selectors';
import {uploadCSV, updateForm, searchText} from './actions';

class Upload extends Component {
    static propTypes = {
        selectUpload: PropTypes.object,
        autocomplete: PropTypes.object,
        uploadCSV: PropTypes.func,
        updateForm: PropTypes.func,
        searchText: PropTypes.func,
    };

    constructor() {
        super(...arguments);
        this.searchText = debounce(this.props.searchText.bind(this), 500);
    }

    _getAutocompleteData() {
        const {autocomplete} = this.props;
        return (autocomplete) || '';
    }

    _onDisplaySearchData() {
        const {selectUpload} = this.props;
        if (selectUpload.uploaded && selectUpload.requestData) {
            return selectUpload.requestData.map(person => {
                return (
                    <ListGroupItem
                        id={`result-${person.id}`}
                        style={selectUpload.selected === person.id
                            ? {borderLeft: `10px solid ${person.colour.toLowerCase()}`}
                            : {}}>
                        {person.name}
                        <button bsStyle='primary' onClick={() => this.handleChange('selected', person.id)}
                                className={selectUpload.selected !== person.id ? 'show pull-right' : 'hide pull-right'}>
                            select
                        </button>
                        <div className={selectUpload.selected === person.id ? 'show' : 'hide'}>
                            <span><strong>Age:</strong> {person.age}</span>
                            <span> | <strong>Address:</strong> {person.age}</span>
                            <span> | <strong>Colour:</strong> {person.colour}</span>
                        </div>
                    </ListGroupItem>
                );
            });
        } else {
            return '';
        }
    }

    handleChange(name, value) {
        const {uploadCSV, updateForm} = this.props;
        updateForm(name, value);

        switch (name) {
            case 'fileUpload':
                uploadCSV(document.getElementById('uploadField').files[0]);
                break;
            case 'searchText':
                this.searchText(value);
                break;
        }
    }

    render() {
        const {selectUpload} = this.props;
        return (
            <Grid>
                <Row>
                    <Jumbotron className='clearfix'>

                        <Col xs={8} md={8}>
                            <h3>First Upload your CSV</h3>
                        </Col>
                        <Col xs={4} md={4}>
                            <FormGroup>
                                <ControlLabel>Upload your CSV File</ControlLabel>
                                <FormControl
                                    type='file'
                                    id='uploadField'
                                    value={selectUpload.fileUpload || ''}
                                    accept='.csv'
                                    placeholder='Choose a file'
                                    onChange={(e) => this.handleChange('fileUpload', e.target.value)}
                                />
                                <FormControl.Feedback />
                                <HelpBlock id='uploading'>please choose a CSV file from your computer</HelpBlock>
                            </FormGroup>
                        </Col>
                    </Jumbotron>

                </Row>
                <Row className='show-grid'>
                    <Col xs={12} md={12}>
                        { selectUpload.uploaded
                            ? <FormGroup>
                                <FormControl
                                    type='text'
                                    id='searchField'
                                    value={selectUpload.searchText || ''}
                                    placeholder='Search data'
                                    onChange={(e) => this.handleChange('searchText', e.target.value)}
                                />
                                {this._getAutocompleteData()}
                                <FormControl.Feedback />
                                <HelpBlock>please type your search</HelpBlock>
                            </FormGroup>
                            : ''}
                    </Col>
                </Row>

                <Row className='show-grid'>
                    <Col xs={12} md={12}>
                        <ListGroup>
                            {this._onDisplaySearchData()}
                        </ListGroup>
                    </Col>
                </Row>

            </Grid>

        );
    }
}

const mapStateToProps = createStructuredSelector({
    selectUpload,
});

const mapDispatchToProps = {
    updateForm,
    uploadCSV,
    searchText,
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
