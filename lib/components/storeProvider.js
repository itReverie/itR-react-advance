import React from 'react';
import PropTypes from 'prop-types';

// simple Higher Order Component allows to isolate the context and store from the Presentational Components

//It receives a regular React Component and it will wrap it with a new component with the context
//The new component could have a couple of new things as well
//Having a function that calls another function in the arrow functions
//Allow us to pass more parameters extra props
const storeProvider = (extraProps) => (Component) => {

    return class extends React.PureComponent{
        static displayName = `${Component.name}Container`;
        static contextTypes = {store: PropTypes.object};


        onStoreChange=()=>{
            //Give the component the signal that it needs to re-render
            this.forceUpdate();
        }

        componentDidMount(){
            //we need to update the component state so the app component state is in sync to the store state
            this.subsciptionId = this.context.store.subscribe(this.onStoreChange);
        }

        componentWillUnmount(){
            this.context.store.unsubscribe(this.subscriptionId);
        }

        render(){
           return <Component
               {...this.props}
               {...extraProps(this.context.store, this.props)}
               store={this.context.store}/>;
        }
    };
};

export default storeProvider;