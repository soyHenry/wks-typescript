import React from 'react';
import { connect } from 'react-redux';
import { Post, fetchPosts, deletePost } from '../actions';
import { StoreState } from '../reducers';
import { PostStoreState } from '../reducers/posts'

interface AppProps {
  posts: Post[];
  loading: boolean;
  fetchPosts(): any;
  deletePost: typeof deletePost;
}

function App(props:AppProps) {
  return (
    <div>
      <button onClick={props.fetchPosts}>FETCH POSTS!</button>
      {
        props.loading
          ? <div> Loading... </div>
          :
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

const mapStateToProps = (state: StoreState): PostStoreState => {
  return {
    posts: state.postsState.posts,
    loading: state.postsState.loading
  };
}

export default connect(
  mapStateToProps,
  { fetchPosts, deletePost }
)(App)
