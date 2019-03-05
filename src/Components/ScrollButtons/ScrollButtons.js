import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/actions';

import PerPage from './PerPage/PerPage';
import PageButton from './PageButton/PageButton';
import './ScrollButtons.css';


class ScrollButtons extends Component {
    state = {
        pageButtons: [1, this.props.users.length / this.props.perPage < this.props.buttonNumber
            ? Math.ceil(this.props.users.length / this.props.perPage) : this.props.buttonNumber]
    }
    renderPageButtons = () => {
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
    resetPagination = (e) => {
        this.props.changePerPage(e.target.value);
        this.setState({ pageButtons: [1, this.props.buttonNumber] })
    }
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
                    pageButtons: [1, this.props.buttonNumber]
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
                    pageButtons: [this.props.pages - this.props.buttonNumber + 1, this.props.pages]
                });
                this.props.changePage(this.props.pages);
            }
    }
    render() {
        const { props: {pages, buttonNumber, changePerPage}, state: {pageButtons}, scroll, resetPagination, renderPageButtons} = this;
        
        if (pages > buttonNumber) {
            return (
                <div className="scroll-buttons">
                    <button className="scroll-button" disabled={pageButtons[0] === 1} onClick={() => scroll("endleft")}>{"<<<"}</button>
                    <button className="scroll-button" disabled={pageButtons[0] === 1} onClick={() => scroll("left", 10)}>{"<<"}</button>
                    <button className="scroll-button" disabled={pageButtons[0] === 1} onClick={() => scroll("left", 1)}>{"<"}</button>
                    {renderPageButtons()}
                    <button className="scroll-button" disabled={pageButtons[1] === pages} onClick={() => scroll("right", 1)}>{">"}</button>
                    <button className="scroll-button" disabled={pageButtons[1] === pages} onClick={() => scroll("right", 10)}>{">>"}</button>
                    <button className="scroll-button" disabled={pageButtons[1] === pages} onClick={() => scroll("endright")}>{">>>"}</button>
                    <PerPage resetPagination={resetPagination} changePerPage={changePerPage} />
                </div>
            )
        } else {
            return (
                <div>
                    {renderPageButtons()}
                    <PerPage />
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