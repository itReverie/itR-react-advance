import React from 'react';
import debounce from 'lodash.debounce';//NOTE: we are just importing the debounce function from lodash not the whole package
import storeProvider from './storeProvider';

class SearchBar extends React.PureComponent{

    state={
        searchTerm: ''
    };

    //A delay so I dont see every character is type but the end result
    doSearch = debounce(()=> {
        this.props.store.setSearchTerm(this.state.searchTerm);
    },300)


    handleSearch = (event) =>{
        this.setState({ searchTerm: event.target.value}, ()=> {
            this.doSearch();
        });

    };

    //In this case we can just convert this to a PureComponent which does the job described below for us.
    // shouldComponentUpdate(nextProps, nextState){
    //     //if we just pass FALSE it will render but does not allow us to type anything as the component is not connected with teh tree
    //     //return false;
    //     //If we pass TRUE it will rerender everysecons as our state with the tick interval is updating the state and a normal component re-renders every time the state is updated.
    //     //return true;
    //     //To solve the issue we should compare current and next props as well as current and previosu state
    // }

    componentWillUpdate(nextProps, nextState)
    {
        console.log('Updating SearchBar');
    }

    //Option 1. We could read the value of the text typed by ref (getting the current DOM node)
    // ref={(input) => this.searchInput = input}
    //However, Option 2. It is more advisable to use the state for that
    render(){
        return (<input
                        type="search"
                        placeholder="Enter search term"
                        value={this.state.searchTerm}
                        onChange={this.handleSearch}/>);
    }
}

//Connecting to the store
export default (storeProvider())(SearchBar);