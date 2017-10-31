import React from 'react';
import PropTypes from 'prop-types';

// simple Higher Order Component allows to isolate the context and store from the Presentational Components

//It receives a regular React Component and it will wrap it with a new component with the context
//The new component could have a couple of new things as well
//Having a function that calls another function in the arrow functions
//Allow us to pass more parameters extra props
const storeProvider = (extraProps) => (Component) => {

    return class extends React.Component{
        static displayName = `${Component.name}Container`;
        static contextTypes = {store: PropTypes.object};

        render(){
           return <Component
               {...this.props}
               {...extraProps(this.context.store, this.props)}
               store={this.context.store}/>;
        }
    };
};

export default storeProvider;