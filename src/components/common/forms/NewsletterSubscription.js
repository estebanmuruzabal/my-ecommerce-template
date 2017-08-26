/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

import config from '../../../config';
import {isValidEmail} from '../../../utils/strings';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Button from '../buttons/Button';
import Text from '../typography/Text';

import InputField from './InputField';

// Translation data for this component
import intlData from './NewsletterSubscription.intl';

/**
 * Component
 */
class NewsletterSubscription extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        newsletterEmail: undefined
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./NewsletterSubscription.scss');
    }

    //*** View Controllers ***//

    handleNewsletterEmailChange = (value) => {
        this.setState({newsletterEmail: value});
    };

    handleNewsletterSubmitClick = () => {
        document.getElementById('mc-embedded-subscribe').click();
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);

        // Return the mailchimp default subscription form that will be hidden and triggered by our UI
        let mailChimpForm = () => {
            return (
                <form action="https://tienda765.us14.list-manage.com/subscribe/post"
                      method="POST" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" noValidate
                      style={{position: 'absolute', left: '-5000px', ariaHidden: 'true'}}>
                    <div id="mc_embed_signup_scroll">
                        <label htmlFor="MERGE0">Subscribe to our mailing list</label>
                        <input type="hidden" name="u" value="67b5228d8d11af7ae1311f884" />
                        <input type="hidden" name="id" value="18e7e3eea1" />
                        <input type="email" value={this.state.newsletterEmail} name="MERGE0" id="MERGE0" required />
                        {this.props.signupSource ?
                            <input type="hidden" name="SIGNUP" id="SIGNUP" value={this.props.signupSource} />
                            :
                            null
                        }
                        <div style={{position: 'absolute', left: '-5000px', ariaHidden: 'true'}}>
                            <input type="text" name="b_e2f7608a217091f244fd31631_9d4cb32d8c" tabIndex="-1" value="" />
                        </div>
                        <div>
                            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" />
                        </div>
                    </div>
                </form>
            );
        };

        //
        // Return
        //
        return (
            <div className="newsletter-subscription">
                <div className="newsletter-subscription__description">
                    <Text color="white" size="small">
                        <FormattedMessage message={intlStore.getMessage(intlData, 'newsletterDescription')}
                                          locales={intlStore.getCurrentLocale()} />
                    </Text>
                </div>
                <div className="newsletter-subscription__content">
                    {mailChimpForm()}
                    <div className="newsletter-subscription__content-item">
                        <InputField placeholder={intlStore.getMessage(intlData, 'newsletterPlaceholder')}
                                    onChange={this.handleNewsletterEmailChange} />
                    </div>
                    <div className="newsletter-subscription__content-item">
                        <Button type="primary" onClick={this.handleNewsletterSubmitClick}
                                disabled={!isValidEmail(this.state.newsletterEmail)}>
                            <Text color="white" size="small">
                               <FormattedMessage message={intlStore.getMessage(intlData, 'newsletterSubmitButton')}
                                              locales={intlStore.getCurrentLocale()} />
                            </Text>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default NewsletterSubscription;
