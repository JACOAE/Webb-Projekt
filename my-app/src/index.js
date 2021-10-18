import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


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

class GetSports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://api.everysport.com/v1/sports?apikey=26192887ec48f76ab54167238ae16688")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        sports: result.sports
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
        const { error, isLoaded, sports } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                {sports.map(sport => (
                    <li key={sport.id}>
                      {sport.name}
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
            <GetSports />
        );
    }
}

// ========================================

ReactDOM.render(
    <Site />, document.getElementById('root')
);
