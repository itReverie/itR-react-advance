//we are just converting the array data into object data
class StateApi{
    constructor( rawData){
        this.data = {
            articles: this.mapIntoObject(rawData.articles),
            authors: this.mapIntoObject(rawData.authors)};
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
    getState= ()=>{
        return this.data;
    }
}

export default StateApi;