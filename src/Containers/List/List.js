import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../Store/Actions/actions';
import User from '../../Components/User/User';
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
        const { users, page, perPage } = this.props;
        return (
            <div>
                <ul className="user-list">
                    {users ? users.slice((page - 1) * perPage, page * perPage).map(user => {
                        return <User name={user.name} key={user.id} id={user.id} />
                    }) : null}
                </ul>
                {users.length !== 0 ? <ScrollButtons /> : null}
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