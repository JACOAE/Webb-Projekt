import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className="square">
                {/* TODO */}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

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

class getLeagues extends React.Component {
    

}


class Site extends React.Component {
    render() {
        return (
            <div className="grid-container">
                <div className="header">
                    <h1>Monkeysports</h1>
                </div>

                <div className="menu_container">
                    <Menu />
                </div>

                <div className="main">
                    Main
                </div>

                <div className="footer">
                    Footer
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Site />, document.getElementById('root')
);
