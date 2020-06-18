import React from 'react';
import PostCreate from './PostCreate';
import PortList from './PortList';


export default function App() {
    return (
        <div className='container'>
            <h1>Create Post</h1>
            <PostCreate/>
            <hr/>
            <h3>Posts</h3>
            <PortList/>
        </div>
    )
}