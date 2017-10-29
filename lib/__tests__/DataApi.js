import DataApi from '../DataApi';
import {data} from '../testData.json'; // we are using {} as it is a property on that file

//interface
const api = new DataApi(data);

describe('DataApi', () => {

    it('Testing Articles', () => {
        const articles = api.getArticles();
        const articleId = data.articles[0].id;
        const articleTitle = data.articles[0].title;

        expect(articles).toHaveProperty(articleId);
        expect(articles[articleId].title).toBe(articleTitle);

    });

    it('Testing Authors', () => {
        const authors = api.getAuthors();
        const authorId = data.authors[0].id;
        const authorTitle = data.authors[0].title;

        expect(authors).toHaveProperty(authorId);
        expect(authors[authorId].title).toBe(authorTitle);
    });

});