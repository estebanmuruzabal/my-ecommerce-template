/**
 * Imports
 */
import React from 'react';
import Modal from '../../common/modals/Modal';
import Select from '../../common/forms/Select';
import Text from '../../common/typography/Text';

/**
 * Component
 */
class MapZonesImages extends React.Component {

    state = {
        openModal: null
    };

    //*** Component Lifecycle ***//

    componentDidMount() {
        require('./MapZonesImages.scss');
    }

    handleOpenModalClick = (modal) => {
        if (modal === 'zone-1') {
            this.setState({
                openModal: modal
            });
        } else if (modal === 'zone-2') {
          this.setState({
              openModal: modal
          });
        } else if (modal === 'zone-3') {
          this.setState({
              openModal: modal
          });
        } else {
            this.setState({openModal: null});
        }
    };

    handleCloseModal = () => {
        this.setState({
            openModal: null
        });
    };

    //*** Template ***//

    render() {
      let modal = () => {
          if (this.state.openModal === 'zone-1') {
              return (
                  <Modal onCloseClick={this.handleCloseModal}>
                    <Text>ZONA 1</Text>
                    <div className="image-zone-one-full">
                    </div>
                  </Modal>
              );
          } else if (this.state.openModal === 'zone-2') {
            return (
                <Modal onCloseClick={this.handleCloseModal}>
                  <Text>ZONA 2</Text>
                  <div className="image-zone-two-full">
                  </div>
                </Modal>
            );
          } else if (this.state.openModal === 'zone-3') {
            return (
                <Modal onCloseClick={this.handleCloseModal}>
                  <Text>ZONA 3</Text>
                  <div className="image-zone-three-full">
                  </div>
                </Modal>
            );
          } else if (this.state.openModal !== null) {
              debug(`Unsupported modal "${this.state.openModal}"`);
          }
      };

        return (
          <div className="map-zone__block-content">
            {modal()}
              <div className="map-zone-ul-row">
                  <div className="image-zone-image-container" onClick={this.handleOpenModalClick.bind(null, 'zone-1')}>
                    <Text>ZONA 1</Text>
                    <div className="image-zone-one">
                    </div>
                  </div>
                  <div className="image-zone-image-container" onClick={this.handleOpenModalClick.bind(null, 'zone-2')}>
                    <Text>ZONA 2</Text>
                    <div className="image-zone-two">
                    </div>
                  </div>
                  <div className="image-zone-image-container" onClick={this.handleOpenModalClick.bind(null, 'zone-3')}>
                    <Text>ZONA 3</Text>
                    <div className="image-zone-three">
                    </div>
                  </div>
              </div>
          </div>
        );
    }
}

/**
 * Exports
 */
export default MapZonesImages;
