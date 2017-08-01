/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../common/typography/Heading';

/**
 * Component
 */
class StoresPage extends React.Component {

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'As Nossas Lojas'
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./StoresPage.scss');
    }

    //*** Template ***//

    render() {
        return (
          <div>
            <p className="stores-page__address">
                <strong>Direccion:</strong><br />
                Güemes 765 <a href="https://goo.gl/maps/iCGwsKYjQXq" target="_blank">Ver en Google Maps</a><br />
                CP 3500 - Resistencia Chaco<br />
            </p>
            <p className="stores-page__schedule">
                <strong>Horário:</strong><br />
                Lunes a Viernes: de 07 a 12:30 y 17 a 20:30<br />
                Sábados: de 09 a 12:30<br />
            </p>
            <p className="stores-page__contacts">
                <strong>Contáctos:</strong><br />
                3624-423398
            </p>
          </div>
        );
    }
}

/**
 * Exports
 */
export default StoresPage;
