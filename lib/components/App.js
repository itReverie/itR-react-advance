//This class component will hold the state of our application
// I have my normal class component CLIENT SIDE
import React from 'react';
import PropTypes from 'prop-types';

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';

class App extends React.Component {

    //****** I need the following lines to expose the CONTEXT
    //to make the context api work we need to define the context type
    static childContextTypes = {
        store: PropTypes.object
    };

    //Getting the context
    getChildContext() {
        return {
            store: this.props.store
        };
    }

    //********

    state = this.props.store.getState();

    //In react we cannot return two elements unless
    //Option 1. is in an array so we need to pass a Key elements
    // render() {
    //     return [
    //         <SearchBar key="searchBar"/>,
    //         <ArticleList key="articleList"
    //             articles={this.state.articles}
    //             store={this.props.store}
    //         />
    //     ];
    // }

    //Option 2. Wrap those components in a div
    render() {
        return (
            <div>
                <SearchBar key="searchBar"/>
                <ArticleList key="articleList"
                             articles={this.state.articles}
                             store={this.props.store}/>
            </div>
        );
    }
}

export default App;