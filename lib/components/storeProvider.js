import React from 'react';
import PropTypes from 'prop-types';

// simple Higher Order Component allows to isolate the context and store from the Presentational Components

//It receives a regular React Component and it will wrap it with a new component with the context
//The new component could have a couple of new things as well
//Having a function that calls another function in the arrow functions
//Allow us to pass more parameters extra props
//extraProps = () =>({}) We are making extra props a default parameter of empty if they dont pass me extra props.

const storeProvider = (extraProps = () =>({})) => (Component) => {

    return class extends React.PureComponent{
        static displayName = `${Component.name}Container`;
        static contextTypes = {store: PropTypes.object};


        //only the properties of the state that have been used for the warp component
        usedState = () => {
            return extraProps(this.context.store, this.props);
        };

        state = this.usedState();


        onStoreChange=()=>{
            if(this.subsciptionId) {
                //Give the component the signal that it needs to re-render
                //this.forceUpdate();
                this.setState(this.usedState());
            }
        }

        componentDidMount(){
            //we need to update the component state so the app component state is in sync to the store state
            this.subsciptionId = this.context.store.subscribe(this.onStoreChange);
        }

        componentWillUnmount(){
            this.context.store.unsubscribe(this.subscriptionId);
            this.subscriptionId = null;
        }



        render(){
           return <Component
               {...this.props}
               {...this.usedState()}
               store={this.context.store}/>;
        }
    };
};

export default storeProvider;