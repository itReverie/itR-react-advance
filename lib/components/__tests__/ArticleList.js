import React from 'react';
//import ArticleList from '../ArticleList';
//import renderer from 'react-test-renderer';
import ArticleList from '../ArticleList';
import Article from '../Article';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

Article.PropTypes ={};

describe('ArticleList', () => {

    it('renders correctly', () => {

        //with jest.fn we are mocking data
        const testProps={
            articles: { a:{id:'a'},
                b:{id:'b'}
            }
            // articles: { a:{id:'a', title:'', body:'', date:''},
            //             b:{id:'b', title:'', body:'', date:''}
            //           }
        };



        //Adding the context has caused some trouble for testing as I need now the full context (global)
        //OPTION 1. We can use some integration testing
        //OPTION 2. Carry on with unit testing and use shallow rendering
        //Shallow rendering means just rendering the exact component we are testing


        //It will render the full tree
        const wrapper=  shallow(<ArticleList {...testProps}/>);

        console.log(wrapper.find('Article'));//.getElement().node.props.children

         expect(wrapper.find('Article').length).toBe(2);
         expect(wrapper).toMatchSnapshot();

    });


});