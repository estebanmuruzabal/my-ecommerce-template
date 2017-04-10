/**
 * Imports
 */
import React from 'react';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Instantiate debugger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class DirectionButton extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./DirectionButton.scss');
    }

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="direction-button">
                { this.props.itemsNum > 1  ?
                    <div>
                      <span className="direction-button__move-button" onClick={this.props.handleMoveLeftClick}>
                          &#10094;
                      </span>
                      <span>{intlStore.getMessage(this.props.item.name)}</span>
                      <span className="direction-button__move-button" onClick={this.props.handleMoveRightClick}>
                          &#10095;
                      </span>
                    </div>
                    :
                    <div>
                      <span>{intlStore.getMessage(this.props.item.name)}</span>
                    </div>
                }
            </div>
        );
    }
}

/**
 * Default Props
 */
DirectionButton.defaultProps = {
    handleMoveLeftClick: function () { debug('handleMoveLeftClick not defined'); },
    handleMoveRightClick: function () { debug('handleMoveRightClick not defined'); }
};

/**
 * Exports
 */
export default DirectionButton;
