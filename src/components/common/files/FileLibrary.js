/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Button from '../buttons/Button';

// Translation data for this component
import intlData from './FileLibrary.intl';

// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class FileLibrary extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    state = {
      image: undefined
    };

    componentDidMount() {
        require('./FileLibrary.scss');

        this.setState({
            image: require('./file_image.png')
        });
    }

    //*** View Controllers ***//

    handleViewURLClick = (idx) => {
        alert(this.props.files[idx].url);
    };

    handleRemoveClick = (idx) => {
        let files = this.props.files;
        files.splice(idx, 1);
        this.props.onChange(files);
    };

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="file-library">
                {this.props.files.map((idx) => {
                    return (
                        <div key={idx} className="file-library__placeholder">
                        <img src={this.state.image} />
                            <div className="file-library__placeholder-overlay">
                                <div className="file-library__placeholder-overlay-content">
                                    <div className="file-library__button">
                                        <Button type="primary" onClick={this.handleRemoveClick.bind(null, idx)}>
                                            <FormattedMessage message={intlStore.getMessage(intlData, 'delete')}
                                                              locales={intlStore.getCurrentLocale()} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

/**
 * Default Props
 */
FileLibrary.defaultProps = {
    onChange: function (files) { debug('onChange not defined.', files); }
};

/**
 * Exports
 */
export default FileLibrary;
