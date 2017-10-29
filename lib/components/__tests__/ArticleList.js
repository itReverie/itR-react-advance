import React from 'react';
//import ArticleList from '../ArticleList';
import renderer from 'react-test-renderer';
import ArticleList from "../ArticleList";

describe('ArticleList', () => {

    it('renders correctly', () => {

        //with jest.fn we are mocking data
        const testProps={
            articles: { a:{id:'a'},
                        b:{id:'b'}
                      },
            articleActions:{lookupAuthor: jest.fn(()=>({}))}
        }

        const tree=  renderer.create(<ArticleList {...testProps}/>).toJSON();

        console.log(tree);

        expect(tree.children.length).toBe(2);
        expect(tree).toMatchSnapshot();

    });


});