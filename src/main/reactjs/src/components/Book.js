import React, {Component} from 'react';
import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';
import {connect} from "react-redux";
import { fetchBooks } from "../Redux/book/bookActions";

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            genres: [],
            languages : [],
            show : false
        };
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }

    initialState = {
        id:'', title:'', author:'', coverPhotoURL:'', isbnNumber:'', price:'', language:'', genre:''
    };

    componentDidMount() {
        const bookId = +this.props.match.params.id;
        if(bookId) {
            this.findBookById(bookId);
        }
        this.findAllLanguages();
        this.findAllGenres();
    }

    findAllLanguages = () => {
        axios.get("http://localhost:8081/rest/books/languages")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    languages: [{value:'', display:'Select Language'}]
                        .concat(data.map(language => {
                            return {value:language, display:language}
                        }))
                });
            });
    };

    findAllGenres = () => {
        axios.get("http://localhost:8081/rest/books/genres")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    genres: [{value:'', display:'Select Genre'}]
                        .concat(data.map(genre => {
                            return {value:genre, display:genre}
                        }))
                });
            });
    };

    findBookById = (bookId) => {
        this.props.fetchBooks(bookId);
        setTimeout(() => {
            let book = this.props.bookFetch.book;
            if(book != null) {
                this.setState({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    coverPhotoURL: book.coverPhotoURL,
                    isbnNumber: book.isbnNumber,
                    price: book.price,
                    language: book.language,
                    genre: book.genre
                });
            }
        },1000)
    };

    resetBook = () => {
        this.setState(() => this.initialState);
    };

    submitBook = event => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        axios.post("http://localhost:8081/rest/books", book)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    updateBook = event => {
        event.preventDefault();

        const book = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        axios.put("http://localhost:8081/rest/books", book)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"put"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    setTimeout(() => this.bookList(), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    bookChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    bookList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {title, author, coverPhotoURL, isbnNumber, price, language, genre} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Book Updated Successfully." : "Book Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Book" : "Add New Book"}
                    </Card.Header>
                    <Form onReset={this.resetBook} onSubmit={this.state.id ? this.updateBook : this.submitBook} id="bookFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="title"
                                                  value={title} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Book Title" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="author"
                                                  value={author} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Book Author" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Cover Photo URL</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="coverPhotoURL"
                                                  value={coverPhotoURL} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Book Cover Photo URL" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label>ISBN Number</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="number" name="isbnNumber"
                                                  value={isbnNumber} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Book ISBN Number" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="number" name="price"
                                                  value={price} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Book Price" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control required as="select"
                                                  custom onChange={this.bookChange}
                                                  name="language" value={language}
                                                  className={"bg-dark text-white"}>
                                        {this.state.languages.map(language =>
                                            <option key={language.value} value={language.value}>
                                                {language.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridGenre">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control required as="select"
                                                  custom onChange={this.bookChange}
                                                  name="genre" value={genre}
                                                  className={"bg-dark text-white"}>
                                        {this.state.genres.map(genre =>
                                            <option key={genre.value} value={genre.value}>
                                                {genre.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.bookList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Book List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}


const mapToStateProps = state => {
    return{
        bookFetch: state.book
    }
};

const mapDispatchToProps = dispatch => {
    return{
        fetchBooks: (bookId) => dispatch(fetchBooks(bookId))
    }
};

export default connect(mapToStateProps, mapDispatchToProps)(Book)
