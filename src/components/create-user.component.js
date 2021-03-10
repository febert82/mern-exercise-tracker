import React, { Component } from 'react'; // importo react
import axios from 'axios'; // importo axios per connessione frontend-backend

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        // faccio il "bind" dei metodi interni al componente
        // per poter usare la keyword "this" al loro interno
        // in modo che si riferisca alla classe di appartenenza
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // inizializzo lo stato del componente
        this.state = {
            username: '',
        }
    }

    // metodo per aggiornare lo stato quando cambia lo username
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    // metodo per gestire la submit del form di inserimento
    onSubmit(e) {
        // previene il comportamento di default del form submit
        e.preventDefault();

        // creo un oggetto con i dati dello stato aggiornati dall'utente
        const user = {
            username: this.state.username,
        }

        console.log(user);

        // mando richiesta post al backend con dati da salvare in db
        axios.post('http://localhost:5000/users/add', user)
            // visualizzo la risposta del backend
            .then(res => console.log(res.data))


        // resto nella pagina dopo l'inserimento, elimino solo il valore
        // della textbox per inserire direttamente un nuovo user
        this.setState({
            username: ''
        });
    }

    // renderizzo il componente con un form di inserimento
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            value="Create User"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}