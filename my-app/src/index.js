import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Logo from './img/logoB.png';

var sportIDChosen = 0;
var teamIDChosen = 0;
var teamInfoElement;


class GetTeamInfo extends React.Component {
    constructor(props) {
        super(props);
       

        this.state = {
            statement: this.props.statement,

            error: null,
            isLoaded: false,
            items: [],
            teamID: this.props.teamID
        };
    }

    

    setTeamId(teamID) {
        this.teamID = teamID;
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
            return <div>{this.state.statement}</div>;
        } else {
            return (
                <GetTeams setTeamId ={this.setTeamId} />


                //team.name
            );
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
                        <a onClick={() => this.props.setTeamId(team.id)}><li key={team.id}>
                            {team.name}
                        </li></a>
                    ))};
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
                        <a onClick={() => clickSports(sport.id)}><li key={sport.id}>
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
    alert(teamid + " clicked!")
    teamIDChosen = teamid;
    teamInfoElement = <GetTeamInfo teamID = {teamIDChosen}/>

    
    ReactDOM.render(teamInfoElement, document.getElementById("main"));
}



class Site extends React.Component {
    render() {
        return (
            <div id="grid-container">
                <div id="header">
                    <img id="headerLogo" src={Logo} alt="Monkeysports"></img>
                </div>

                <div id="menu_container">
                    <Menu />
                </div>

                <div id="main">
                    <GetTeamInfo statement='Hello'/>
                </div>

                <div id="footer">
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

class Main extends React.Component {
    render() {
        return (
            <h3>Välkommen till MonkeySports!</h3>
        )
    }
}

// ========================================

ReactDOM.render(
    <Site />, document.getElementById('root')
);
