// Packages
import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import UserDataFeed from './user-data.json';

// Endpoints
let API = 'https://the-test-api.com/api/';

// let UserData = '{"data": {"accounts": [{"account_id":1,"users":[{"user_id":1,"name":"John","age":30},{"user_id":2,"name":"Sally","age":25}]},{"account_id":2,"users":[]}]}}';

class UserData extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: false,
            error: false,
        }
    }

    componentWillMount(){

        // This is how I would have queried the JSON API if it were on a live feed


        // const component = this;
        //
        // axios.get(API)
        // .then((response) => {
        //      
        //      component.buildAccounts(response.data);
        //
        // })
        // .catch((err) => {
        //     console.log(err);
        //     this.setState({
        //         error: true
        //     })
        // })

        let UserDataResponse = UserDataFeed.data;

        this.buildAccounts(UserDataResponse);

    }

    // Accept API data, parse to HTML elements, store as state variables
    buildAccounts(responseData){

        let users = [];

        // Loop through response data
        responseData.accounts.map((accountData) => {
            // Find users, format user data in an array to fit the table
            accountData.users.map((user, i) => {
                let userData = {
                    user_id: user.user_id,
                    name: user.name,
                    age: user.age,
                    account_id: accountData.account_id
                }
                // Push formatted user data to user array
                users.push(userData);
            })
        });

        // Once all data has been parsed, set new array as a state variable, set data to true to greenlight render 
        this.setState({
            data: true,
            responseData: responseData.data,
            users: users,
        })
    }

    render(){

        // Build colums for React Table (https://react-table.js.org/)
        const columns = [
            {
                Header: 'User ID',
                accessor: 'user_id',
            },
            {
                Header: 'Name',
                accessor: 'name'
            }, 
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Account ID',
                accessor: 'account_id'
            }];

        if(this.state.data){
            return(
                <ReactTable 
                    data={this.state.users}
                    columns={columns}
                    defaultPageSize={5}
                />
            )
        }
        else if(this.state.error){
            return(
                <div>
                    <h1>Something went wrong!</h1>
                </div>
            )
        }
        return null;
    }
}

export default UserData;