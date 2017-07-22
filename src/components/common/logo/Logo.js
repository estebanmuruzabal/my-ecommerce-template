/**
 * Imports
 */
import React from 'react';

/**
 * Component
 */
class Logo extends React.Component {

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Logo.scss');
    }

    //*** Template ***//

    render() {

        return (
            <div>
              <div className="logo">
                <div className="upper">
                  <span className="char1">T</span>
                  <span className="char2">i</span>
                  <span className="char3">e</span>
                  <span className="char4">n</span>
                  <span className="char5">d</span>
                  <span className="char6">a</span>
                  <span className="char7">7</span>
                  <span className="char8">6</span>
                  <span className="char9">5</span>
                </div>
                <div className="star">
                  <div className="seal">
                    <div className="face">
                      <img src="https://s3.amazonaws.com/stash.rachelnabors.com/codepen/badge/tuna-face.svg" />
                    </div>
                  </div>
                </div>
                <div className="lower">
                  <span className="char1">R</span>
                  <span className="char2">e</span>
                  <span className="char3">s</span>
                  <span className="char4">i</span>
                  <span className="char5">s</span>
                  <span className="char6">t</span>
                  <span className="char7">e</span>
                  <span className="char8">n</span>
                  <span className="char9">c</span>
                  <span className="char10">i</span>
                  <span className="char11">a</span>
                </div>
              </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default Logo;
