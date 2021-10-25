import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Logo from './img/logoB.png';

var sportIDChosen = 0;
var teamIDChosen = 0;


class GetTeamInfo extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
        
    }



    setTeamId(teamID) {
        teamIDChosen = teamID;
    }


    componentDidMount() {
        if (this.teamIDChosen == 0) {

        }
        else {
            fetch("http://api.everysport.com/v1/teams/" + teamIDChosen + "?apikey=26192887ec48f76ab54167238ae16688")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            team: result.team

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
    }


    render() {
        const { error, isLoaded, team } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>...Loading</div>;
        } else {
            return (
                //<GetTeams setTeamId = {this.setTeamId} />
                <div>
                    <h3>{team.name}</h3>
                    <img src={team.logo} alt="Lagets logga" height="200" />
                </div>
            )
        }
    }

}

class GetTeams extends React.Component {
    constructor(props, sportid) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {
        fetch("http://api.everysport.com/v1/teams?apikey=26192887ec48f76ab54167238ae16688" + "&sport=" + sportIDChosen)
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
    handleBack() {
        this.props.history.goBack();
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
                    <h2>Välj ett lag:</h2>
                    {teams.map(team => (

                        /* Vår version */
                        <a href="#" onClick={() => clickTeams(team.id)}><li className="teamList" key={team.id}>
                            {team.name}
                        </li></a>
                        


                        /* Åkes Version 
                        <a onClick={() => this.props.setTeamId(team.id)}><li key={team.id}>
                            {team.name}
                        </li></a>
                        */
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
                    <h2>Välj en sport:</h2>
                    {sports.map(sport => ( //Skriver ut sporten och kör funktionen clickSports när list itemet klickas på
                        <a href="#" onClick={() => clickSports(sport.id)}><li key={sport.id}>
                            {sport.name}
                        </li></a>
                    ))}
                </ul>
            );
        }
    }

}

//kom ihåg att ta bort denna; nej
function clickSports(sportid) {
    sportIDChosen = sportid;
    var element = <GetTeams />
    ReactDOM.render(element, document.getElementById('menu_container'));
}

function clickTeams(teamid) {
    teamIDChosen = teamid;

    ReactDOM.unmountComponentAtNode(document.getElementById("main"))
    var element = <GetTeamInfo />

    ReactDOM.render(element, document.getElementById("main"));
}



class Site extends React.Component {
    render() {
        return (
            <div id="grid-container">
                <div id="header">
                    <a href="#" onClick={() => window.location.reload()}><img id="headerLogo" src={Logo} alt="Monkeysports" /></a>
                </div>

                <div id="menu_container">
                    <Menu />
                </div>

                <div id="main">
                    <Main />
                </div>

                <div id="footer">
                    MonkeySports AB (William Tiderman, Jacob Eriksson och John Engblom)
                </div>
            </div>
        );
    }
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GetSports />
        );
    }
}

class Main extends React.Component {
    render() {
        return (
            <h2>Välkommen till MonkeySports!</h2>
        )
    }
}

// ========================================

ReactDOM.render(
    <Site />, document.getElementById('root')
);
