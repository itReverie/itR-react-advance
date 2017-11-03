//This class component will hold the state of our application
// I have my normal class component CLIENT SIDE
import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
import Perf from 'react-addons-perf';

if(typeof window !== 'undefined') {
    window.Perf = Perf;
}

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import Timestamp from './Timestamp';

class App extends React.PureComponent {

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


    //**** Subscribing to a portion of the state,
    //pretty much just returning what we really need as a state for this particular component
    appState =()=>{
        const {articles, searchTerm} = this.props.store.getState();
        return  {articles, searchTerm};
    };

    state = this.appState();
    //****


    onStoreChange = () => {
        //this.props.store.getState....we dont need to read directly from the props state but our own implementation
        this.setState(this.appState);
    }

    componentDidMount() {
        //we need to update the component state so the app component state is in sync to the store state
        this.subsciptionId = this.props.store.subscribe(this.onStoreChange);
        this.props.store.startClock();


        //TODO: Leaving this purposely uncommented. Be aware that in production this has to be commented.
        //We need consistent measures that's why we need to add this lines so we messure the components at the same point
        //Those numbers need to be the same every time we refresh
        //setImmediate(()=>{Perf.start();});
        //setTimeout(()=>{ Perf.stop();
        //Perf.printWasted();},5000);
    }

    componentWillUnmount() {
        this.props.store.unsubscribe(this.subscriptionId);
    }

    //This life cylce method can help us to identify where can we improve our optimization
    // componentWillUpdate(nextProps, nextState)
    // {
    //     console.log('Updating TimeStamp');
    // }

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


    //To solve rendering the articles if the properties have not changed
    //Just re-render if you need to
    //Downside is that we will have to update this method if we have another property
    // shouldComponentUpdate(nextProps, nextState){
    //     return (nextState.articles !== this.state.articles ||
    //             nextState.searchTerm !== this.state.searchTerm);
    // }

    render() {
        let {articles, searchTerm} = this.state;
        //making the search case insensitive
        const searchRegex = new RegExp(searchTerm, 'i');
        if (searchTerm) {
            articles = pickBy(articles, (value) => {
                return value.title.match(searchRegex) ||
                    value.body.match(searchRegex);
            });
        }
        return (
            <div>
                <Timestamp/>
                <SearchBar key="searchBar"/>
                <ArticleList key="articleList"
                             articles={articles}
                />
            </div>
        );
    }
}

export default App;