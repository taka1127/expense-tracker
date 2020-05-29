import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Input, Label, Form, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Expenses extends Component {
  state = { 
    date: new Date(),
    isLoading: true,
    expenses: [],
    Categories: []
  }

  async componentDidMount() {
    const response = await fetch('/api/categories');
    const body = await response.json();
    this.setState({ Categories: body, isLoading: false });
  }

  

  render() { 
    const title = <h3 className="mt-3 mb-3 ">経費の追加</h3>
    const { Categories, isLoading } = this.state;

    if (isLoading)
      return (<div>Loading...</div>)
    
    let optionList =  Categories.map(category => <option id={category.id}>{category.name}</option>) 
    
    
    return (
      <div>
        <AppNav />
        <Container>
         {title}
          <Form onSubmit={this.handleSubmit}>
          <FormGroup className="d-flex flex-column">
            <label for="title">タイトル</label>
            <input type="text" name="title" id="title" onChange={this.handleChange} autoComplete="name" ></input>
          </FormGroup>


          <FormGroup className="d-flex flex-column">
              <label for="category">カテゴリー</label>
              <select className="col-md-2 mb-3 ">
                {optionList}
              </select>
             
              

              <input type="text" name="category" id="category" onChange={this.handleChange} ></input>
          </FormGroup>


          <FormGroup className=" col-md-4 mb-3 p-0 d-flex flex-column">
            <label for="expenseDate">日時</label>
            <DatePicker selected={this.state.date} onChange={this.handleChange} />
          </FormGroup>

            <FormGroup className="col-md-4 mb-3 p-0 d-flex flex-column">
              <label for="location">場所</label>
              <input type="text" name="location" id="location" onChange={this.handleChange} ></input>
            </FormGroup>

          <FormGroup>
            <Button color="primary" type="submit">保存</Button>{' '}
            <Button color="secondary" tag={Link} to="/">キャンセル</Button>
          </FormGroup>


          </Form>
        </Container>
      </div>
    );
  }
}
 
export default Expenses;