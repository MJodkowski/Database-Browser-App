import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/actions';

import PageButton from '../PageButton/PageButton';
import './ScrollButtons.css';


class ScrollButtons extends Component {
    state = {
        buttonNumber: this.props.buttonNumber,
        pageButtons: [1, this.props.users.length / this.props.perPage < this.props.buttonNumber
            ? Math.ceil(this.props.users.length / this.props.perPage) : this.props.buttonNumber]
    }
    pageButtons = () => {
        const buttons = [];
        for (let x = this.state.pageButtons[0]; x <= this.state.pageButtons[1]; x++) {
            x === this.props.page ? buttons.push(<PageButton
                disabled={true}
                number={x}
                key={x}
                clickHandler={(x) => this.props.changePage(x)}
            />) :
                buttons.push(<PageButton number={x} key={x} clickHandler={(x) => this.props.changePage(x)} />)
        }
        return buttons;
    };
    scroll = (direction, increment) => {
        if (direction === 'left' || direction === 'endleft') {
            if (this.state.pageButtons[0] - increment >= 1) {
                this.setState({
                    pageButtons: this.state.pageButtons.map(elem =>
                        elem -= increment),
                });
                this.props.changePage(this.props.page < this.state.pageButtons[1] - increment ?
                    this.props.page : this.state.pageButtons[1] - increment)
            } else if (((this.state.pageButtons[0] - increment) < 1) || direction === 'endleft') {
                this.setState({
                    pageButtons: [1, this.state.buttonNumber]
                });
                this.props.changePage(1);
            }
        } else if (direction === 'right' || direction === 'endright')
            if (this.state.pageButtons[1] + increment <= this.props.pages) {
                this.setState({
                    pageButtons: this.state.pageButtons.map(elem =>
                        elem += increment)
                });
                this.props.changePage(this.props.page > this.state.pageButtons[0] + increment ?
                    this.props.page : this.state.pageButtons[0] + increment)
            } else if (((this.state.pageButtons[1] + increment) > this.props.pages) || direction === 'endright') {
                this.setState({
                    pageButtons: [this.props.pages - this.state.buttonNumber + 1, this.props.pages]
                });
                this.props.changePage(this.props.pages);
            }
    }
    render() {
        if (this.props.pages > this.state.buttonNumber) {
            return (
                <div className="scroll-buttons">
                    <button className="scroll-button" disabled={this.state.pageButtons[0] === 1} onClick={() => this.scroll("endleft")}>{"<<<"}</button>
                    <button className="scroll-button" disabled={this.state.pageButtons[0] === 1} onClick={() => this.scroll("left", 10)}>{"<<"}</button>
                    <button className="scroll-button" disabled={this.state.pageButtons[0] === 1} onClick={() => this.scroll("left", 1)}>{"<"}</button>
                    {this.pageButtons()}
                    <button className="scroll-button" disabled={this.state.pageButtons[1] === this.props.pages} onClick={() => this.scroll("right", 1)}>{">"}</button>
                    <button className="scroll-button" disabled={this.state.pageButtons[1] === this.props.pages} onClick={() => this.scroll("right", 10)}>{">>"}</button>
                    <button className="scroll-button" disabled={this.state.pageButtons[1] === this.props.pages} onClick={() => this.scroll("endright")}>{">>>"}</button>
                    <select id="page-numbers" onChange={(e) => {
                        this.props.changePerPage(e.target.value);
                        this.setState({ pageButtons: [1, this.props.buttonNumber] })
                    }}>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <label for="page-numbers">Entries per page</label>
                </div>
            )
        } else {
            return (
                <div>
                    {this.pageButtons()}
                    <select id="page-numbers" onChange={(e) => this.props.changePerPage(e.target.value)
                    }>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select >
                    <label for="page-numbers">Entries per page</label>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        buttonNumber: state.pageButtonNumber,
        users: state.users,
        pages: state.pages,
        page: state.page
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => dispatch(actions.changePage(page)),
        changePerPage: (entries) => dispatch(dispatch(actions.changePerPage(entries)))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ScrollButtons);