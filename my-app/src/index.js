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



class GetTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://api.everysport.com/v1/teams?apikey=26192887ec48f76ab54167238ae16688")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        teams: result.teams
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, teams } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {teams.map(team => (
                        <li key={team.id}>
                            {team.name}
                        </li>
                    ))}
                </ul>
            );
        }
    }

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

class Menu extends React.Component {
    render() {
        return (
            <GetTeams />
        );
    }
}

// ========================================

ReactDOM.render(
    <Site />, document.getElementById('root')
);
