import React, { Component } from 'react'; // importo react
// importo l'oggetto link per ancorare gli elementi del DOM alle "routes" di react
import { Link } from 'react-router-dom';
// importo axios per la connessione frontend-backend
import axios from 'axios';

// componente "interno" corrispondente al singolo exercise da visualizzare
// nella tabella del componente principale,
// ognuno dei quali contiene un link al metodo per la propria cancellazione
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        
        // faccio il "bind" dei metodi interni al componente
        // per poter usare la keyword "this" al loro interno
        // in modo che si riferisca alla classe di appartenenza
        this.deleteExercise = this.deleteExercise.bind(this);
    
        // inizializzo lo stato del componente
        this.state = {exercises: []};
    }

    // metodo richiamato appena il componente viene "montato"
    // e appena prima di essere renderizzato nella pagina
    componentDidMount() {
        // mando richiesta get al backend per prelevare gli exercises dal db
        axios.get('http://localhost:5000/exercises/')
            // aggiorno lo stato con i dati dal backend
            .then(response => {
                this.setState({exercises: response.data})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // metodo per eliminare un exercises
    deleteExercise(id) {
        // mando richiesta delete al backend per eliminare l'exercise
        axios.delete('http://localhost:5000/exercises/' + id)
            // visualizzo il responso dell'operazione trasmesso dal backend
            .then(res => console.log(res.data));
        // aggiorno l'array dello state filtrandolo
        // con i soli elementi con campo _id diverso da quello eliminato
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    // metodo che ritorna i contenuti della table (lista di exercises)
    // da renderizzare nel componente
    exerciseList() {
        // per ogni elemento dell'array ritorno un componente "Exercise"
        // con l'elemento corrispondente, il metodo per la sua cancellazione
        // e l'id come chiave dell'elemento nella lista
        return this.state.exercises.map(currentexercise => {
            return (
                <Exercise 
                    exercise={currentexercise}
                    deleteExercise={this.deleteExercise}
                    key={currentexercise._id}
                />
            );
        });
    }

    // renderizzo il componente con una "table" di exercises
    // richiamando il metodo "exerciseList" del componente
    // che popola la table con gli elementi dello state
    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        );
    }
}