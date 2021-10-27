import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Logo from './img/logoW.png';

var sportIDChosen = 0;
var teamIDChosen = 0;
var leagueIDChosen = 0;
var eventIDChosen = 0;

class GetEventInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {
        fetch("http://api.everysport.com/v1/events/" + eventIDChosen + "?apikey=26192887ec48f76ab54167238ae16688")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        event: result.event
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
            );
    }
    handleBack() {
        this.props.history.goBack();
    }
    render() {
        const { isLoaded, event } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            /*{event.gameEvents.map(gameEvent => (
                <li className="eventList" key={gameEvent.id}>
                <h4>{gameEvent.id}</h4>
            </li>
            ))}*/
            
            return (
                <div>
                    <a href="#" onClick={() => clickEventBack()}><h4 id="eventBackButton">Tillbaka</h4></a>
                    <h4>{event.homeTeam.name} - {event.visitingTeam.name} </h4>
                    <h4>{event.startDate.substring(0, 10)}</h4>
                    <h4>{event.homeTeamScore} - {event.visitingTeamScore}</h4>
                    <h1>{event.liveScore}</h1>
                    <img className="eventPictureHome" src={event.homeTeam.logo} alt="HemmaLagets logga" />
                    <img className="eventPictureVisiting" src={event.visitingTeam.logo} alt="BortaLagets logga" />
                    <div id="eventMain"></div>
                </div>
            );
        }
    }

}


class GetEvents extends React.Component {
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
        fetch("http://api.everysport.com/v1/leagues/" + leagueIDChosen + "/events?apikey=26192887ec48f76ab54167238ae16688" + "&team=" + teamIDChosen)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        events: result.events
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
        const { error, isLoaded, events } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div id = "eventMain" style={{ height: '100%' } }>
                    <ul>

                        {events.map(event => (
                            <a href="#" onClick={() => clickEvent(event.id)}><li className="eventList" key={event.id}>
                                <p>{event.homeTeam.name} - {event.visitingTeam.name}</p>
                                <p>{event.homeTeamScore} - {event.visitingTeamScore} </p>
                                <img className="eventListPictureHome" src={event.homeTeam.logo} alt="HemmaLagets logga" />
                                <img className="eventListPictureVisiting" src={event.visitingTeam.logo} alt="BortaLagets logga" />
                                <p>{event.startDate.substring(0, 10)}</p>
                            </li></a>
                        ))}
                    </ul>
                </div>
            );
        }
    }

}

class GetTeamInfo extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };

    }

    //fetch("http://api.everysport.com/v1/events/?apikey=26192887ec48f76ab54167238ae16688" +"&sport=" + sportIDChosen + "&league=" + leagueIDChosen + "&team=" + teamIDChosen))

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
                            team: result.team,
                            //events: result.events
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
        const { error, isLoaded, team, events } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>...Loading</div>;
        } else {
            return (
                //<GetTeams setTeamId = {this.setTeamId} />
                //
                <div id="main" style={{ overflow: 'auto' } }>
                    <h3>{team.name}</h3>
                    <img id="bigTeamLogo" src={team.logo} alt="Lagets logga" height="200" />

                    <GetEvents />
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
        fetch("http://api.everysport.com/v1/leagues/" + leagueIDChosen + "/teams?apikey=26192887ec48f76ab54167238ae16688")
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
                <ul class='menuList'>
                    <a href="#" onClick={() => clickTeamBack()}><li> Tillbaka </li></a>
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

class GetLeagues extends React.Component {
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
        fetch("http://api.everysport.com/v1/leagues?apikey=26192887ec48f76ab54167238ae16688" + "&sport=" + sportIDChosen)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        leagues: result.leagues
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
        const { error, isLoaded, leagues } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    <a href="#" onClick={() => clickLeagueBack()}><li>Tillbaka</li></a>
                    <h2>Välj en liga:</h2>
                    {leagues.map(league => (

                        /* Vår version */
                        <a href="#" onClick={() => clickLeagues(league.id)}><li className="leagueList" key={league.id}>
                            {league.name + " " + league.startDate.substring(0, 4)}
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
                <ul class='menuList'>
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
function clickTeamBack() {
    ReactDOM.unmountComponentAtNode(document.getElementById("menu_container"))


    ReactDOM.unmountComponentAtNode(document.getElementById("main"))
    var element = <Main />
    ReactDOM.render(element, document.getElementById("main"));

    element = <GetLeagues />
    ReactDOM.render(element, document.getElementById('menu_container'));
}
function clickEventBack() {
    ReactDOM.unmountComponentAtNode(document.getElementById("main"))


    var element = <GetTeamInfo />
    ReactDOM.render(element, document.getElementById('main'));
}
function clickLeagueBack() {
    ReactDOM.unmountComponentAtNode(document.getElementById("menu_container"))

    var element = <GetSports />
    ReactDOM.render(element, document.getElementById('menu_container'));
}
function clickEvent(eventid) {
    eventIDChosen = eventid;
    ReactDOM.unmountComponentAtNode(document.getElementById("main"));

    var element = <GetEventInfo />
    ReactDOM.render(element, document.getElementById('main'))
}

function clickLeagues(leagueid) {
    leagueIDChosen = leagueid;

    ReactDOM.unmountComponentAtNode(document.getElementById("menu_container"))
    var element = <GetTeams />

    ReactDOM.render(element, document.getElementById('menu_container'));
}

function clickTeams(teamid) {
    teamIDChosen = teamid;

    //var sheet = document.getElementById('index').sheet
    //var css_rules_num = sheet.cssRules.length;

    //sheet.insertRule("#main { overflow:auto; }", css_rules_num);

    ReactDOM.unmountComponentAtNode(document.getElementById("main"))
    var element = <GetTeamInfo />

    ReactDOM.render(element, document.getElementById("main"));

}

function clickSports(sportid) {
    sportIDChosen = sportid;

    ReactDOM.unmountComponentAtNode(document.getElementById("menu_container"))
    var element = <GetLeagues />

    ReactDOM.render(element, document.getElementById('menu_container'));
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
                    <p id="footerText">MonkeySports AB (William Tiderman, Jacob Eriksson och John Engblom)</p>
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
            <div>
                <h2>Välkommen till MonkeySports!</h2>
                <div id="eventMain">
                    <EventMain />
                </div>
            </div>
        )
    }
}

class EventMain extends React.Component {
    render() {
        return (
            <div>
                <h4>Välj ett lag för att se deras matcher</h4>
            </div>
        )
    }
}

// ========================================

ReactDOM.render(
    <Site />, document.getElementById('root')
);
