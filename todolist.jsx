// function Helloworld(props){
//     let {name = "word"} = props;
//     return <div>Hello, {name}!</div>
// }

// class Helloworld extends React.Component{
//     render(...a){
//         console.log(a);
//         let {name = "word"} = this.props;
//         return <div>Hello, {name}!</div>;
//     }
// }

class TodoList extends React.Component{
    state = {
        items: [
            {id: 1, name: "Купить хлеб",    deadline: "2023-09-01 10:00", done: false},
            {id: 2, name: "Покормить кота", deadline: "2023-09-01 12:00", done: true},
            {id: 3, name: "Сделать лабу по мобилке", deadline: "2023-09-01 18:00", done: false},
        ],
        add: false,
    }

    formatDate(d){
        let [date, time] = d.split(" ");
        let dp = date.split('-').reverse();
        return `${dp.join(".")} ${time}`
        //console.log(dp,time);
    }

    openPopup = () => this.setState({add: true})

    closePopup(){this.setState({add: false}) }

    submitHandler(e){
        e.preventDefault();
        console.log(e.target);
        let allID = this.state.items.map(item => item.id);
        let newID = (allID.length > 0) ? Math.max(...allID)+1 : 1;
        let elForm = e.target;
        let newItem = {
            id: newID,
            name: elForm.elements.name.value,
            deadline: String(elForm.elements.deadline.value).replace('T', ' '),
            done: false,
        }
        let items = this.state.items;
        items.push(newItem);
        this.setState({items: items, add: false})
        console.log(newItem)
    }

    render(){
        return <div className="container">
               <table className="table table-striped-columns">
                <thead>
                    <tr>
                        <th>#</th>
                        <td>Задача</td>
                        <td>Дедлайн</td>
                        <td>Статус</td>
                        <td>Действия</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.items.map(({id, name, deadline, done}, i) => 
                        <tr key={i}>
                            <th>{id}</th>
                            <td>{name}</td>
                            <td>{this.formatDate(deadline)}</td>
                            <td>{done ? 'Готово' : 'Ждёт'}</td>
                            <td>
                                <button className="btn btn-primary">Готово</button>&nbsp;
                                <button className="btn btn-danger">Удалить</button>
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="4">&nbsp;</td>
                    <td>
                        <button className="btn btn-success" onClick={this.openPopup.bind(this)}>Создать</button>
                    </td>
            </tr>
                </tfoot>
               </table>
              { this.state.add && <div className="popup"> 
                    <div className="popup__body">
                        <form action="" onSubmit={this.submitHandler.bind(this)}>
                            <table className="table">
                                <tbody>
                                    <tr>
                                    <th className="text-center" colSpan="2">Новая задача</th>
                                </tr>
                                <tr>
                                    <th>Задача</th>
                                    <td><input type="text" className="form-control" name="name" /></td>
                                </tr>
                                <tr>
                                    <th>Дедлайн</th>
                                    <td><input type="datetime-local" className="form-control" name="deadline"/></td>
                                </tr>
                                <tr>
                                <td colSpan="2" className="text-center">
                                        <button className="btn btn-info btn__color">Добавить</button>&nbsp;
                                        <button className="btn btn-info btn__danger btn__color" type="button" onClick={this.closePopup.bind(this)}>Отмена</button>
                                </td> 
                                </tr> 
                                </tbody>

                            </table>
                        </form>
                    </div>
    </div>}
        </div>
    }
}   