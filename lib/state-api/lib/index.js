class StateApi{

    constructor( rawData){
        //we are  converting the array data into object data
        this.data = {
            articles: this.mapIntoObject(rawData.articles),
            authors: this.mapIntoObject(rawData.authors),
            searchTerm :'',
            timestamp: new Date()};
        this.subscriptions ={};
        this.lastSubscriptionId=0;

        //Simulating adding an article every minute
        setTimeout(() => {
            const fakeArticle = {
                ...rawData.articles[0],
                id: 'fakeArticleId',
            };
            //This line mutates the state and that wont be recognized by the PureComponent
            // this.data.articles[fakeArticle.id] = fakeArticle;

            //Hence instead of mutating the state we will copy
            //We are copying the current state and modifying that copy of the current state
            //So for the previous object and current object are different
            //Copying current data
            //Change the articles object
            //add new article
            this.data = {
                ...this.data,
                articles: {
                    ...this.data.articles,
                    [fakeArticle.id]: fakeArticle,
                },
            };
            this.notifySubscribers();
        }, 1000);
    }



    mapIntoObject(arr){
        return  arr.reduce( (acc, curr)=> {
            acc[curr.id] = curr;
            return acc;
        }, {});
    }

    //Converting it into a class property so we don't have to deal with any binding
    //lookupAuthor (authorId)   {
    lookupAuthor = (authorId) =>{
        return this.data.authors[authorId];
    }

    // getState(){
    //Return the data in objects
    getState= ()=>{
        return this.data;
    }

    //The call back is what the subscriber is interested to be executed.
    //Every time that data changes, please call this call back
    subscribe =(callback) => {
        this.lastSubscriptionId ++;
        this.subscriptions[this.lastSubscriptionId] = callback;
        return this.lastSubscriptionId;
    };

    //I am leaving the DOM tree so do not bother in notifying me of changes
    //Remove me from your list
    unsubscribe =(subscriptionId) => {
           delete this.subscriptions[subscriptionId];
    };

    //Notify to all the places where we are using the state (data) that there have been changes
    //We do that because react is a one way binding so we need to let him know
    notifySubscribers =()=>{
        Object.values(this.subscriptions).forEach((callback) => callback());
    };

    //Updatet the current state with the  new state changes
    //Notify everybody
    mergeWithState = (stateChange) =>{
        this.data = {...this.data, ...stateChange};
        this.notifySubscribers();
    };


    //if the state gets bigger or there are too many actions
    //it is better to deal with the sate separate than the app.js
    setSearchTerm = (searchTerm) => {

        this.mergeWithState({
            searchTerm,
        });
    };

    startClock = ()=>{
        setInterval(()=>{this.mergeWithState({timestamp: new Date()
        });
        }, 1000);
    };
}

export default StateApi;