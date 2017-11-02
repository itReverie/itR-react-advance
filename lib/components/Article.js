import React from 'react';
import PropTypes from 'prop-types';
import storeProvider from './storeProvider';

//styles using javascript
//The style variable is out of the component so the object is not created everytime the Article object is changed.
const styles = {
    article: {
        paddingBottom: 10,
        borderBottomStyle: 'solid',
        borderBottomColor: '#aaa',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
    },
    date: {
        fontSize: '0.85em',
        color: '#888',
    },
    author: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    body: {
        paddingLeft: 20,
    }
};
const dateDisplay = (dateString) => new Date(dateString).toDateString();

//********** Presentational Component ****************
//Reads the context from props so It is easy to shallow test it
class Article extends React.PureComponent {

    //Ideally there should not be operations or functions here
    render() {
        const {article, author} = this.props;
        return (
            <div style={styles.article}>
                <div style={styles.title}>{article.title}</div>
                <div style={styles.date}>
                    {dateDisplay((article.date))}
                    {article.date}
                </div>
                <div style={styles.author}><a href={author.website}>
                    {author.firstName} {author.lastName}
                </a></div>
                <div style={styles.body}>{article.body}</div>
            </div>
        );
    }
}


Article.propTypes = {
    article: PropTypes.shape({
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired
    })
};

//We are using props that do not use the state
function extraProps(store, originalProps) {
    return {
        author: store.lookupAuthor(originalProps.article.authorId)
    };
}

//This is similar as connect in Redux
const ArticleContainer = storeProvider(extraProps)(Article);
export default ArticleContainer;
