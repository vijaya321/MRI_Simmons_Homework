import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { Controls } from './controls/Controls'
import PostsContainer from './PostsContainer'

function SelectOptions () {
    const initialFValues = {
        authorId: '',
        postsPerPage: 0
    }
    const postsPerPage = [
        { id: 2, name: 2 },
        { id: 5, name: 5 },
        { id: 10, name: 10 },
    ]

    const [users, usersSet] = useState([]);
    const [values, setValues] = useState(initialFValues);
    const [showPostContainer, setPostContainer] = useState(true);

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (name === 'authorId' && values.postsPerPage !== 0) {
            setPostContainer(false)
        }
        if (name === 'postsPerPage') {
            setPostContainer(true)
            values.postsPerPage = 0
        }
    }
    
        useEffect(() => {
            async function fetchUsers() {               
              const fullResponse = await fetch('https://jsonplaceholder.typicode.com/users');
              const responseJson = await fullResponse.json();
              usersSet(responseJson);
            }
            fetchUsers();
          }, [values]);
    
    return (
        <Grid container>
            <Grid item sm={12} md={6}>
                <Controls.Select 
                    label='Author' 
                    options={users} 
                    onChange={handleInputChange} 
                    name='authorId' 
                    value={values.authorId}/>
            </Grid>
            <Grid item sm={12} md={6}>
                <Controls.Select 
                    label='Count' 
                    options={postsPerPage}
                    onChange={handleInputChange}
                    name='postsPerPage'
                    value={values.postsPerPage} />
            </Grid>
            {showPostContainer && <PostsContainer values={values} />}
        </Grid>
    )
}

export default SelectOptions