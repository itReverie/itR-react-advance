//This class component will hold the state of our application
// I have my normal class component CLIENT SIDE
import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';

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

    onStoreChange=()=>{
        this.setState(this.props.store.getState);
    }

    componentDidMount(){
        //we need to update the component state so the app component state is in sync to the store state
        this.subsciptionId = this.props.store.subscribe(this.onStoreChange);
    }

    componentWillUnmount(){
        this.props.store.unsubscribe(this.subscriptionId);
    }

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
    // return (
    //      <div>
    //          <SearchBar key="searchBar" doSearch={this.props.store.setSearchTerm}/>
    //          <ArticleList key="articleList" articles={articles}
    //                      store={this.props.store}/>
    //      </div>
    // );


    // We can just update when the store state changes..this means we need to subscribe
    // with a callback
    // we can  make a StateApi an event emmiter (Flux)
    // or manage subscriptions in the same object

    render() {
        let { articles , searchTerm}=this.state;
        if(searchTerm){
            articles= pickBy(articles, (value) => {
                return value.title.match(searchTerm) ||
                     value.body.match(searchTerm);
            });
        }
        return (
            <div>
                <SearchBar key="searchBar" doSearch={this.props.store.setSearchTerm}/>
                <ArticleList key="articleList"
                             articles={articles}
                             store={this.props.store}/>
            </div>
        );
    }
}

export default App;