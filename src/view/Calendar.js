import * as React from 'react';
import Header from "../components/header/Header";

class Calendar extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <div className="main__container">
                    <div className="main__grid">
                        <h1>Calendar</h1>
                    </div>
                </div>
            </div>
        )
    }
}



export default Calendar;