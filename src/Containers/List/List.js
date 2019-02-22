import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../Store/Actions/actions';
import User from '../User/User';
import ScrollButtons from '../../Components/ScrollButtons/ScrollButtons';
import './List.css';
import { bindActionCreators } from '../../../../../../../AppData/Local/Microsoft/TypeScript/3.2/node_modules/redux';

class List extends Component {
    async componentDidMount() {
        if (!this.props.users.length) {
            this.props.onLoad();
        }
    }
    render() {
        let users;
        if (this.props.users) {
            users = this.props.users.slice((this.props.page - 1) * this.props.perPage, this.props.page * this.props.perPage).map(user => {
                return <User name={user.name} key={user.id} id={user.id}/>
            });
        }
        return (
        <div>
            <ul className="user-list">
               {users}
            </ul>
            {this.props.users.length !== 0 ? <ScrollButtons/> : null}
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        page: state.page,
        pages: state.pages,
        pageButtons: state.pageButtons,
        perPage: state.perPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(actions.getData()),
        changePage: (page) => dispatch(actions.changePage(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);