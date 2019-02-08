import * as React from 'react';
import ListElement from '../components/dashboard-child-components/ListElement';
import uuid from 'uuid';
import { connect } from 'react-redux';
import filterExpenses  from '../selectors/filters';
import { filterCategory, filterDescription, filterStatus } from '../actions/filters';
import Search from '../components/history-components/Search';
import SelectContainer from '../components/history-components/SelectContainer';
import Header from "../components/header/Header";

class History extends React.Component {

    handleChangeSelect = (e) => {
        const { dispatch } = this.props;
        dispatch(filterCategory(e.target.value));
        e.preventDefault();
    }

    handleChangeSelectStatus = (e) => {
        const { dispatch } = this.props;
        dispatch(filterStatus(e.target.value));
        e.preventDefault();
    }

    handleChangeSearch = (e) => {
        const { dispatch } = this.props;
        dispatch(filterDescription(e.target.value));
        e.preventDefault();
    }


    render() {
        const { filters } = this.props;
        const historyBills = this.props.fetchItems;
        const filtered = historyBills
        .map(item => item.category)
        .filter((item, index, array) => array.indexOf(item) === index);

        return (

        <div>
            <Header />
            <div className="main__container">

              <div className="history-grid main__grid">
                <h1 className="history__title">History</h1>

                <div className="inputs__container">
                    <Search
                    onChange={this.handleChangeSearch}
                    value={filters.description} />

                    <SelectContainer
                    changeSelect={this.handleChangeSelect}
                    valueSelect={filters.category}
                    changeStatus={this.handleChangeSelectStatus}
                    valueStatus={filters.status} />
                </div>

              </div>
              <section className="list history__list">

                <div className="list__titles">
                    <p className="title">Date</p>
                    <p className="title">Details</p>
                    <p className="title">Category</p>
                    <p className="title">Amount</p>
                </div>

                <div>
                    <div className="list__container">

                        <div>
                        <ul className="list__transactions">
                            {historyBills.map(bill => (
                            <ListElement
                                key={bill.id}
                                array={filtered}
                                {...bill}
                            />
                            ))}
                        </ul>
                        </div>

                    </div>
                </div>

              </section>
            </div>
          </div>
        )
}
}
const mapStateToProps = state => ({
    fetchItems: filterExpenses(state.fetchItems.itemsHistory, state.filters),
    filters: state.filters
})


export default connect(mapStateToProps)(History);