import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button, Jumbotron, Grid, Row, Col} from 'react-bootstrap';

import {selectUpload} from './selectors';
import {uploadCSV, updateForm} from './actions';

class Upload extends Component {
    static propTypes = {
        selectUpload: PropTypes.object,
        uploadCSV: PropTypes.func,
        updateForm: PropTypes.func,
    };

    constructor() {
        super(...arguments);
    }

    getValidationState() {

    }


    handleChange(name, value) {
        const {uploadCSV, updateForm} = this.props;
        updateForm(name, value);
        if (name === 'fileUpload') {
            uploadCSV(document.getElementById(name).files[0]);
        }
    }

    render() {
        const {selectUpload} = this.props
        return (
            <Grid>
                <Row>
                    <Jumbotron className="clearfix">

                        <Col xs={8} md={8}>
                            <h3>First Upload your CSV</h3>
                        </Col>
                        <Col xs={4} md={4}>
                            <FormGroup
                                controlId="formBasicText"
                                validationState={this.getValidationState()}
                            >
                                <ControlLabel>Upload your CSV File</ControlLabel>
                                <FormControl
                                    type="file"
                                    id="fileUpload"
                                    value={selectUpload.fileUpload || ''}
                                    placeholder="Choose a file"
                                    onChange={(e) => this.handleChange("fileUpload", e.target.value)}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>please choose a CSV file from your computer</HelpBlock>
                            </FormGroup>
                        </Col>
                    </Jumbotron>

                </Row>
                <Row className="show-grid">
                    <Col xs={12} md={12}>

                    </Col>
                </Row>
            </Grid>

        )
    }

}

const mapStateToProps = createStructuredSelector({
    selectUpload
});

const mapDispatchToProps = {
    updateForm,
    uploadCSV
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
