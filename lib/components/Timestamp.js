
import React from 'react';
import storeProvider from './storeProvider';

class Timestamp extends React.Component{

    static timeDisplay =  (timestamp) => timestamp.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'});


    //This logic is causing the Timestamp component to render every minute, in order to avoid that we
    //will move the ShouldComponentUpdate one level up to the Container Component


    // //We will do a custom should component update so it just updates based on the time and minutes update
    // shouldComponentUpdate(nextProps, nextState){
    //     //const currentTimeDisplay= this.props.timestamp.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'});
    //     //const nextTimeDisplay= nextProps.timestamp.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'});
    //     //So if it is different re render just every minute not every second
    //     //return currentTimeDisplay !== nextTimeDisplay;
    //
    //     //Simplified version
    //     return (this.timeDisplay(this.props.timestamp) !=
    //             this.timeDisplay(nextProps.timestamp));
    // }



    render(){
        return(<div>{this.props.timestampDisplay}</div>);
    }
}

//We are using props that use the state (Contrary to articles List )
function extraProps(store)
{
    //This is the only component that is actually making use of the state
    //timestamp: store.getState().timestamp
    return {

        timestampDisplay: Timestamp.timeDisplay(store.getState().timestamp)
    };
}

export default storeProvider(extraProps) (Timestamp);