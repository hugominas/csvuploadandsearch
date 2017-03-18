import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button, Jumbotron, Grid, Row, Col} from 'react-bootstrap';

import {uploadCSV} from './actions';

class Upload extends Component {
    static propTypes = {};

    constructor() {
        super(...arguments);
    }

    getValidationState() {

    }

    handleChange() {

    }

    render() {
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
                                    value={''}
                                    placeholder="Choose a file"
                                    onChange={this.handleChange}
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
    //featureFlags: selectFeatureFlags,
});

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
