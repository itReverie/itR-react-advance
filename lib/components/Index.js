import React from 'react';
import ReactDOM from 'react-dom'; // We need this dependency because we are interfacing with the browser


// I have my normal class component
class App extends React.Component{
    //Using class properties from babel Stage-2, it need babel-polyfill
    state={ answer:42};

    // I am declaring a function
    asyncFunc = () => {
        return Promise.resolve(37);
    };

    //It is important to label the host function as async
    async componentDidMount(){
        this.setState({answer: await this.asyncFunc()});
    }

    render(){
        return (
            <h2>Hello I am a react Class component. -- {this.state.answer}</h2>
        );
    }
}

export default App;


// I am rendering in the DOM my app
ReactDOM.render(<App/>, document.getElementById('root'));