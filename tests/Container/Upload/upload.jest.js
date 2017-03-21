import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Upload from 'containers/Upload/Upload';
import configureStore from '../../../src/store';

it('renders correctly', () => {
    const mockStore = configureStore();
    const tree = renderer.create(
        <Provider store={mockStore}>
            <Upload />
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});