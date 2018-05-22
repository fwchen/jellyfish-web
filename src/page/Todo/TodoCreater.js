// @flow
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';
import { Subject } from 'rxjs';

const InputGroup = Input.Group;

export class TodoCreater extends Component<
  { add$: Subject<void> },
  {
    value: string
  }
> {
  state = { value: '' };

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleKeyPress = async (event: SyntheticEvent<HTMLInputElement>) => {
    console.log(this.props.add$);
    if (event.key === 'Enter') {
      try {
        await axios.post('/api/todo', { content: this.state.value });
        this.setState({ value: '' });
        this.props.add$.next();
        message.success('Add todo successful');
      } catch (error) {
        console.error(error);
        message.error('Add a todo failure, please retry later.');
      }
    }
  };

  render() {
    return (
      <InputGroup compact>
        <Input
          style={{ width: '50%' }}
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <DatePicker />
      </InputGroup>
    );
  }
}