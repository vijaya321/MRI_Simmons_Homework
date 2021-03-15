import { Card, Typography, IconButton, Badge, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import CommentIcon from '@material-ui/icons/Comment'
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    submitBtn: {
    width: '100%'
    },
    postsItem: {
        margin: '1%'
    },
    showMore: {
        margin: '1%'
    }
}))

function PageContent(props) {
    const { authorId, postsPerPage } = props;
    const classes = useStyles();

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [btnClick, setbtnClick] = useState(false)
    const [showBtn, setShowBtn] = useState(0)
    const [start, setStart] = useState(0)
    const [disabled, setDisabled] = useState(false)
    
    const showMorePosts = () => {
        let postCount = +showBtn + +posts.filter(item => item.userId === authorId).slice(start, +start + +postsPerPage).length

        setbtnClick(!btnClick)
        setShowBtn(postCount)

        if(postCount >= 8 && postsPerPage === 2) {
            setDisabled(true)
        } else if(postCount >= 5 && postsPerPage === 5) {
            setDisabled(true)
        } else setDisabled(false)
            
        setStart(start => +start + +postsPerPage)
    }

    useEffect(() => {
        async function fetchPosts() {          
          const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
          const postsJson = await postsResponse.json();
          setPosts(postsJson);
        }
        async function fetchComments() {               
            const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
            const commentsJson = await commentsResponse.json();
            setComments(commentsJson);
        }
            fetchPosts()
            fetchComments()
      }, [btnClick]);

    return (
        <>
            <Grid container className={classes.postsContainer} >
                <Grid item sm={12} md={12} className={classes.postsItems}>
                    { posts.filter(item => item.userId === authorId).slice(start, +start + +postsPerPage).map(
                                item => (
                                    <Card className={classes.postsItem} variant='outlined'>
                                        <Typography variant='h5' component='div' >
                                            {item.title}
                                        </Typography>
                                        <Typography variant='body1' component='div'>
                                            {item.body}
                                        </Typography>
                                        <IconButton>
                                            <Badge badgeContent={comments.filter(comment => comment.postId === item.id).length} color="primary">
                                                <CommentIcon fontSize="medium" color='black'/>
                                            </Badge>
                                        </IconButton>
                                    </Card>
                                    )
                    )}
                </Grid>
                <Grid item sm={12} md={12} className={classes.showMore}>
                    {
                        postsPerPage > 0 && 
                            <Button variant="outlined" color="primary" className={classes.submitBtn} disabled={disabled} onClick={showMorePosts}>
                                Show More
                            </Button>
                    }   
                </Grid>
            </Grid>
        </>
    )
}

export default PageContent