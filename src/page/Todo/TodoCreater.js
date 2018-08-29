// @flow
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';
import { Subject } from 'rxjs';

const InputGroup = Input.Group;
const Option = Select.Option;

export class TodoCreater extends Component<
  { add$: Subject<void>, style: any },
  {
    value: string
  }
> {
  state = { value: '' };

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleKeyPress = async (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      try {
        await axios.post('/api/auth/todo', { content: this.state.value });
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
      <div style={this.props.style}>
        <InputGroup
          compact
          style={{
            display: 'flex',
            justifyContent: 'center',
            transform: 'scale(1.3, 1.3)'
          }}
        >
          <Select defaultValue="NORMAL">
            <Option value="NORMAL">待办</Option>
            <Option value="HABIT">习惯</Option>
          </Select>
          <Input
            style={{ width: '50%' }}
            value={this.state.value}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <DatePicker placeholder="截止时间" />
        </InputGroup>
      </div>
    );
  }
}
