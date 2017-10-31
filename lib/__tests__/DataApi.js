import StateApi from 'state-api';
import {data} from '../testData.json'; // we are using {} as it is a property on that file

//interface
const store = new StateApi(data);

describe('StateApi', () => {

    it('Testing Articles', () => {
        const articles = store.getState().articles;
        const articleId = data.articles[0].id;
        const articleTitle = data.articles[0].title;

        expect(articles).toHaveProperty(articleId);
        expect(articles[articleId].title).toBe(articleTitle);

    });

    it('Testing Authors', () => {
        const authors = store.getState().authors;
        const authorId = data.authors[0].id;
        const authorTitle = data.authors[0].title;

        expect(authors).toHaveProperty(authorId);
        expect(authors[authorId].title).toBe(authorTitle);
    });

});