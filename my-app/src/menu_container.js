import React from 'react';
import ReactDOM from 'react-dom';

class Menu extends React.Component {
    render() {
        return (
            <div className="menu_container">
                <h2>Ligor</h2>
                <h2>Lag</h2>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Menu />, document.getElementByClassName('menu_container')
);