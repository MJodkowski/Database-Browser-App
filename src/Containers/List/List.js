import React, { Component } from 'react';
import HTTP from '../../Classes/HTTP';
import User from '../User/User';
import PageButton from '../../Components/PageButton/PageButton';
import ScrollButtons from '../../Components/ScrollButtons/ScrollButtons';
import './List.css';

class List extends Component {
    async componentDidMount() {
        try {
            let users = await HTTP.get('https://contact-browser.herokuapp.com/contacts');
            users = Object.keys(users).map(key => {
                return {
                    id: key,
                    name:users[key]
                };
            });
            this.setState({users: users, 
                pageButtons: [1, Math.min(Math.ceil(users.length / 10), 10)],
                pages: Math.ceil(users.length / 10)});
        } catch(err) {
            console.log(err);
        }
    }
    state = {
        users: null,
        page: 1,
        pages: null,
        pageButtons: [0, 10]
    }
    createButtons = () => {
        const buttons = [];
        for (let x = this.state.pageButtons[0]; x <= this.state.pageButtons[1]; x++) {
            if (x === this.state.page) {
                buttons.push(<PageButton disabled={true} number={x} key={x} clickHandler={this.changePage} />)
            } else { 
                buttons.push(<PageButton number={x} key={x} clickHandler={this.changePage} />)
            }
        }
        return buttons;
    }
    changePage = (number) => {
        this.setState({page: number});
    }
    deleteEntry = async (e, id) => {
        e.stopPropagation();
        const removedUserArray = this.state.users;
        try {
            await HTTP.delete('https://contact-browser.herokuapp.com/contact/', id);
            removedUserArray.splice(removedUserArray.findIndex(elem => {
                    return elem.id === id}), 1);
                this.setState({users: removedUserArray});
        } catch (err) {
            console.log(err);
        }  
    }
    scrollButton = (direction, increment) => {
        if (direction === 'left' || direction === 'endleft') {
            if (this.state.pageButtons[0] - increment >= 1) {
                this.setState({pageButtons: this.state.pageButtons.map(elem =>
                    elem -= increment),
                    page: this.state.page < this.state.pageButtons[1] - increment ? 
                        this.state.page : this.state.pageButtons[1] - increment});
            } else if (((this.state.pageButtons[0] - increment) < 1) || direction === 'endleft') {
                this.setState({page: 1, 
                    pageButtons: [1, 10]
                });
            }
        } else if (direction === 'right' || direction === 'endright')
            if (this.state.pageButtons[1] + increment <= this.state.pages) {
                this.setState({pageButtons: this.state.pageButtons.map(elem =>
                    elem += increment),
                    page: this.state.page > this.state.pageButtons[0] + increment ? 
                        this.state.page : this.state.pageButtons[0] + increment});
            } else if (((this.state.pageButtons[1] + increment) > this.state.pages) || direction === 'endright') {
                this.setState({page: this.state.pages,
                    pageButtons: [this.state.pages - 9, this.state.pages]});
        }
    }
    render() {
        let users;
        if (this.state.users) {
            users = this.state.users.slice((this.state.page - 1) * 10, this.state.page * 10).map(user => {
                return <User name={user.name} key={user.id} id={user.id} delete={(e, id) => this.deleteEntry(e, id)} />
            });
        }
        return (
        <div>
            <ul className="user-list">
               {users}
            </ul>
            <ScrollButtons 
                pages={this.state.pages} 
                pageButtons={this.state.pageButtons} 
                children={this.createButtons()} 
                scroll={this.scrollButton} 
            />
        </div>
        );
    }
}

export default List;