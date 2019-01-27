import React, { Component } from 'react';
import HTTP from '../../Classes/HTTP';
import './User.css';

class User extends Component {
    state = {
            expanded: false,
            userData: null
    }
    expandPerson = () => {
        if (!this.state.expanded && !this.state.userData) {
            this.setState({expanded: true});
            HTTP.get(`https://contact-browser.herokuapp.com/contact/${this.props.id}`)
            .then(results => this.setState({userData: results}))
            .catch(err => console.log(err));
        } else if (!this.state.expanded) {
            this.setState({expanded: true});
        } else {
            this.setState({expanded: false});
        };
    }
    listData = (data) => {
        let dataList = [];
        let uniqueKey = 0;
        for (let key in data) {
            dataList.push(<tr key={uniqueKey}><td key={uniqueKey + 50} className="user-data-key">{key.charAt(0).toUpperCase() + key.substr(1).replace(/_/, ' ')}: </td><td key={uniqueKey + 100}>{data[key]}</td></tr>);
            uniqueKey++;
        };
        return dataList;
    }
    render() {
        let dataList = null;
        if (this.state.userData && this.state.expanded) {
            dataList = this.listData(this.state.userData);
        };
        return (
            <li className="user-list-item">
                <div className="user" onClick={this.expandPerson}>
                    <div className="user-header-container">
                        <h2 className="user-header">{this.props.name}</h2>
                        <button className="delete-button" onClick={(e) => this.props.delete(e, this.props.id)}>Delete User</button>
                    </div>
                    <table className={this.state.expanded ? "user-data-list" : ""} >
                        <tbody>
                            {dataList}
                        </tbody>
                    </table>
                </div>
            </li>
        );
    }
}
export default User;