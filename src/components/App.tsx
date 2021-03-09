import React from 'react';
import { connect } from 'react-redux';
import { Post, fetchPosts, deletePost } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  posts: Post[];
  fetchPosts(): any;
  deletePost: typeof deletePost;
}

function App(props:AppProps) {
  return (
    <div>
      <button onClick={props.fetchPosts}>FETCH POSTS!</button>
      {
        props.posts.map((post: Post) => {
          return (
            <div key={post.id}>
              {post.id}) {post.title} <button onClick={() => props.deletePost(post.id)}>X</button>
            </div>
          );
        })
      }
    </div>
  );
}

const mapStateToProps = (state: StoreState): {posts: Post[]} => {
  return {
    posts: state.posts
  };
}

export default connect(
  mapStateToProps,
  { fetchPosts, deletePost }
)(App)
