import React from 'react'
import { Grid } from '@material-ui/core'
import PageContent from './PageContent';

export default function PostsContainer(props) {
    
    const { values } = props;
    return (
        <Grid container>
            <Grid item sm={12} md={12}>
                <PageContent authorId={values.authorId} postsPerPage={values.postsPerPage} />
            </Grid>
         </Grid>
    )
}
