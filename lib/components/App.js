//This class component will hold the state of our application
// I have my normal class component CLIENT SIDE


import React from 'react';
//we are going to use Axios as our ajax library to make a call to the api
import axios from 'axios';
import DataApi from 'state-api';

import ArticleList from './ArticleList';

class App extends React.Component {

    // //as we are now using async data we might also use the React lifecycle methods
    // async componentDidMount() {
    //     //fetch the data
    //     const response = await axios.get('/data').catch();
    //     const api = new DataApi(response.data);
    //
    //     this.setState(() => {
    //         return {
    //             articles: api.getArticles(),
    //             authors: api.getAuthors()
    //         };
    //     });
    // }

    constructor(props) {
        super(props);
        //Initialize before the component mount
        //This initialization could also happen outside of the constructor
        this.state ={ articles: this.props.initialData.articles,
                      authors: this.props.initialData.authors};
    }

    articleActions = {
        lookupAuthor: (authorId) => this.state.authors[authorId]
    };


    render() {
        return (
            <ArticleList
                articles={this.state.articles}
                articleActions={this.articleActions}
            />
        );
    }
}

export default App;