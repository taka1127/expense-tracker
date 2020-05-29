import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import { Table, Container, Input, Label, Form, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Expenses extends Component {

  emptyItem = {
    id: 104,
    expensedate: new Date(),
    description: '',
    location: '',
    category: { "id": 1, "name": 'Travel' }
  }

  constructor(props) {
    super(props);

    this.state = { 
      date: new Date(),
      isLoading: false,
      Categories: [],
      Expenses: [],
      item: this.emptyItem
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

  }


  async handleSubmit(event) {
    // event.peventDefault();
    const  item  = this.state.item;
    await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    event.preventDefault();
    this.props.history.push("/expenses");
  }


  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  handleDateChange(date) {
    let item = { ...this.state.item };
    item.expensedate = date;
    this.setState({ item });
  }




  async remove(id) {
    await fetch('/api/expenses/${id}', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedExpenses = [...this.state.Expenses].filter (i => i.id !== id);
      this.setState({ Expenses: updatedExpenses });
    });
  }

  

  async componentDidMount() {
    const response = await fetch('/api/categories');
    const body = await response.json();
    this.setState({ Categories: body, isLoading: false });


    const responseExp = await fetch('/api/categories');
    const bodyExp = await responseExp.json();
    this.setState({ Expenses: bodyExp, isLoading: false });
  }

  

  render() { 
    const title = <h3 className="mt-3 mb-3 ">経費の追加</h3>
    const { Categories} = this.state;
    const { Expenses, isLoading } = this.state;

    if (isLoading)
      return (<div>Loading...</div>)
    
    let optionList =  Categories.map(category => <option id={category.id} key={category.id}>{category.name}</option>) 
    
    
    let rows = Expenses.map(expense =>
      <tr key={expense.id}>
        <td>{expense.description}</td>
        <td>{expense.location}</td>
        <td className="text-center"><Moment date={expense.expensedate} format="YYYY/MM/DD" /></td>
        {/* <td>{expense.category.name}</td> */}
        <td><Button size="sm" color="danger" onClick={()=>this.remove(expense.id)}>削除</Button></td>
      </tr>
    )

    return (
      <div>
        <AppNav />
        <Container>
         {title}
          <Form onSubmit={this.handleSubmit}>
          <FormGroup className="d-flex flex-column">
            <Label for="title">タイトル</Label>
            <Input type="text" name="title" id="title" onChange={this.handleChange} autoComplete="name" ></Input>
          </FormGroup>


          <FormGroup className="col-md-4 mb-3 p-0 d-flex flex-column">
              <Label for="category">カテゴリー</Label>
              <select onChange={this.handleChange}>
                {optionList}
              </select>
          </FormGroup>


          <FormGroup className=" col-md-4 mb-3 p-0 d-flex flex-column">
            <Label for="expenseDate">日時</Label>
            <DatePicker selected={this.state.item.expensedate} onChange={this.handleDateChange} />
          </FormGroup>

            <FormGroup className="col-md-4 mb-3 p-0 d-flex flex-column">
              <Label for="location">場所</Label>
              <Input type="text" name="location" id="location" onChange={this.handleChange} ></Input>
            </FormGroup>

          <FormGroup>
            <Button color="primary" type="submit">保存</Button>{' '}
            <Button color="secondary" tag={Link} to="/">キャンセル</Button>
          </FormGroup>


          </Form>
        </Container>

        {''}
        <Container>
          <h3 className="mt-3 mb-3 ">経費リスト</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">内容</th>
                <th width="10%">場所</th>
                <th className="text-center" width="30%">カテゴリー</th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>

          </Table>

        </Container>

      </div>
    );
  }
}
 
export default Expenses;