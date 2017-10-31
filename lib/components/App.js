//This class component will hold the state of our application
// I have my normal class component CLIENT SIDE
import React from 'react';
import PropTypes from 'prop-types';

import ArticleList from './ArticleList';

class App extends React.Component {

    //****** I need the following lines to expose the CONTEXT
    //to make the context api work we need to define the context type
    static childContextTypes={
        store: PropTypes.object
    };
    //Getting the context
    getChildContext(){
        return {
            store:this.props.store};
    }
    //********

    state= this.props.store.getState();

    render() {
        return (
            <ArticleList
                articles={this.state.articles}
                store={this.props.store}
            />
        );
    }
}

export default App;