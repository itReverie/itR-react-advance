import React from 'react';

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


const Article = (props) => {
    const {article, author} = props;
    //Ideally there should not be operations or functions here
    return (
        <div style={styles.article}>
            <div  style={styles.title}>{article.title}</div>
            <div  style={styles.date}>
                {dateDisplay((article.date))}
                {article.date}
                </div>
            <div style={styles.author}><a href={author.website}>
                {author.firstName} {author.lastName}
            </a></div>
            <div style={styles.body}>{article.body}</div>
        </div>
    );
};

export default Article;