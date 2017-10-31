import React from 'react';
import debounce from 'lodash.debounce';//NOTE: we are just importing the debounce function from lodash not the whole package

class SearchBar extends React.Component{

    state={
        searchTerm: ''
    };

    //A delay so I dont see every character is type but the end result
    doSearch = debounce(()=> {
        this.props.doSearch(this.state.searchTerm);
    },300)


    handleSearch = (event) =>{
        this.setState({ searchTerm: event.target.value}, ()=> {
            this.doSearch();
        });

    };


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

export default SearchBar;