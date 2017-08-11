/**
 * Imports
 */
import React from 'react';

/**
 * Component
 */
class CommunityList extends React.Component {

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context) {
        return {
            title: 'CommunityList'
        }
    };

    //*** Template ***//

    render() {
        return (
          <div>
            <h1>CommunityList Page</h1>
            <p>
              Para comprar una caja de verduras tenes que completar un grupo de 20 personas
            </p>
            <h1>Actualmente contamos con los siguientes grupos:</h1>
            
          </div>
        );
    }
}

/**
 * Exports
 */
export default CommunityList;
