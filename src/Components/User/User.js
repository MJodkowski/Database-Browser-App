import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/actions'
import HTTP from '../../Classes/HTTP';
import './User.css';

class User extends Component {
    state = {
            expanded: false,
            userData: null
    }
    expandPerson = async () => {
        if (!this.state.expanded && !this.state.userData) {
            this.setState({expanded: true});
            try {
                let results = await HTTP.get(`https://contact-browser.herokuapp.com/contact/${this.props.id}`);
                this.setState({userData: results});
            } catch (err) {
                console.log(err);
            }
        } else {
            this.setState({expanded: !this.state.expanded});
        }
    }
    listData = (data) => {
        let dataList = [];
        let uniqueKey = 0;
        for (let key in data) {
            dataList.push(<tr key={uniqueKey}><td key={uniqueKey + 50} className="user-data-key">{key.charAt(0).toUpperCase() + key.substr(1).replace(/_/, ' ')}: </td><td key={uniqueKey + 100}>{data[key]}</td></tr>);
            uniqueKey++;
        }
        return dataList;
    }
    render() {
        const { state: {userData, expanded}, props: {name, deleteData, id}, expandPerson, listData} = this;
        return (
            <li className="user-list-item">
                <div className="user" onClick={expandPerson}>
                    <div className="user-header-container">
                        <h2 className="user-header">{name}</h2>
                        <button className="delete-button" onClick={(e) => deleteData(id, e)}>Delete User</button>
                    </div>
                    <table className={expanded ? "user-data-list" : ""} >
                        <tbody>
                            {userData && expanded ? listData(userData) : null}
                        </tbody>
                    </table>
                </div>
            </li>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteData: (id, e) => dispatch(actions.deleteData(id, e))
    }
}

export default connect(null, mapDispatchToProps)(User);