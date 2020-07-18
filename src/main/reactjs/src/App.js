import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Book from './components/Book';
import BookList from './components/BookList';
import UserList from './components/UserList';
import Footer from './components/Footer';
import "./style.css"
import store from "./Redux/store";
import {Provider} from 'react-redux'

export default function App() {
    const heading = "Welcome to Book Store";
    const quote = "Good friends, good books, and a sleepy conscience: this is the ideal life.";
    const footer = "Mark Twain";

    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} className={"margin-top"}>
                        <Switch>
                            <Route path="/" exact component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                            <Route path="/add" exact component={Book}/>
                            <Route path="/edit/:id" exact component={Book}/>
                            <Route path="/list" exact component={BookList}/>
                            <Route path="/users" exact component={() =>
                                <Provider store={store}><UserList/></Provider>}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    );
}