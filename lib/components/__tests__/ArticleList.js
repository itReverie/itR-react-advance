import React from 'react';
//import ArticleList from '../ArticleList';
//import renderer from 'react-test-renderer';
import ArticleList from '../ArticleList';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('ArticleList', () => {

    it('renders correctly', () => {

        //with jest.fn we are mocking data
        const testProps={
            articles: { a:{id:'a'},
                b:{id:'b'}
            }
        };

        //It will render the full tree
        const wrapper=  shallow(<ArticleList {...testProps}/>);

        console.log(wrapper.find('Article'));//.getElement().node.props.children

         expect(wrapper.find('Article').length).toBe(2);
         expect(wrapper).toMatchSnapshot();

    });


});