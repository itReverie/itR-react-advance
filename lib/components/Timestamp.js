
import React from 'react';
import storeProvider from './storeProvider';

class Timestamp extends React.PureComponent{

    timeDisplay =  (timestamp) => timestamp.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'});

    //We will do a custom should component update so it just updates based on the time and minutes update
    shouldComponentUpdate(nextProps, nextState){
        //const currentTimeDisplay= this.props.timestamp.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'});
        //const nextTimeDisplay= nextProps.timestamp.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'});
        //So if it is different re render just every minute not every second
        //return currentTimeDisplay !== nextTimeDisplay;

        //Simplified version
        return (this.timeDisplay(this.props.timestamp) !=
                this.timeDisplay(nextProps.timestamp));
    }

    componentWillUpdate(nextProps, nextState)
    {
        console.log('Updating TimeStamp');
    }

    render(){
        return(<div>{this.props.timestamp.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})}</div>);
    }
}

function extraProps(store)
{
    return {
        timestamp: store.getState().timestamp
    };
}

export default storeProvider(extraProps) (Timestamp);