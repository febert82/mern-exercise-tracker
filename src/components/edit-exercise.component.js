// importo react
import React, { Component } from 'react';
// importo axios per la connessione frontend-backend
import axios from 'axios';
// importo libreria DatePicker di react
import DatePicker from 'react-datepicker';
// importo lo stile per i datepicker
import 'react-datepicker/dist/react-datepicker.css';

// definisco il componente "CreateExercise"
export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        // faccio il "bind" dei metodi interni al componente
        // per poter usare la keyword "this" al loro interno
        // in modo che si riferisca alla classe di appartenenza
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // inizializzo lo stato del componente
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // metodo richiamato appena il componente viene "montato"
    // e appena prima di essere renderizzato nella pagina
    componentDidMount() {
        // richiedo al backend i dati dall'elemento da editare
        // utilizzando come campo "id" lo stesso id fornito direttamente
        // nell'URL della pagina corrente
        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
            .then(response => {
                // aggiorno lo stato del componente con i dati dell'elemento
                // restituito dal backend
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        // richiedo al backend la lista degli users per la selezione
        axios.get('http://localhost:5000/users/')
            .then(response => {
                // se è presente almeno uno user
                if (response.data.length > 0) {
                    // aggiorno lo state con gli users
                    // prendendo solamente il campo "username"
                    this.setState({
                        users: response.data.map(user => user.username),
                    });
                }
            });
    }

    // metodo per aggiornare lo stato quando cambia lo username
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    // metodo per aggiornare lo stato quando cambia la description
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    // metodo per aggiornare lo stato quando cambia la duration
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    // metodo per aggiornare lo stato quando cambia la date
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    // metodo per gestire la submit del form di inserimento
    onSubmit(e) {
        // previene il comportamento di default del form submit
        e.preventDefault();

        // creo un oggetto con i dati dello stato aggiornati dall'utente
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        // mando richiesta post al backend con dati da modificare nel db
        // utilizzando il campo "id" presente nell'URL della pagina corrente
        axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
            // visualizzo la risposta del backend
            .then(res => console.log(res.data))

        // ritorno alla pagina "/" dopo il submit dei dati del form
        window.location = "/";
    }

    // renderizzo il componente con un form di inserimento
    // e una funzione "map" che elenca gli username del database
    // in un menu a tendina
    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div> 
                    </div>

                    <div className="form-group">
                        <input type="submit"
                            value="Edit Exercise Log"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}