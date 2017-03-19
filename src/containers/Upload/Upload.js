import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button, Jumbotron, Grid, Row, Col} from 'react-bootstrap';
import {debounce} from 'lodash';
import {selectUpload} from './selectors';
import {uploadCSV, updateForm, searchText} from './actions';

class Upload extends Component {
    static propTypes = {
        selectUpload: PropTypes.object,
        uploadCSV: PropTypes.func,
        updateForm: PropTypes.func,
        searchText: PropTypes.func,
    };

    constructor() {
        super(...arguments);
        this.searchText = debounce(this.props.searchText.bind(this), 500)

    }

    getValidationState() {

    }

    handleChange(name, value) {
        const {uploadCSV, updateForm} = this.props;
        updateForm(name, value);

        switch (name) {
            case 'fileUpload':
                uploadCSV(document.getElementById(name).files[0]);
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
                            <FormGroup
                                validationState={this.getValidationState()}>
                                <ControlLabel>Upload your CSV File</ControlLabel>
                                <FormControl
                                    type='file'
                                    id='fileUpload'
                                    value={selectUpload.fileUpload || ''}
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
                                    value={selectUpload.searchText || ''}
                                    placeholder='Search data'
                                    onChange={(e) => this.handleChange('searchText', e.target.value)}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>please type your search</HelpBlock>
                            </FormGroup>
                            : ''}
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
