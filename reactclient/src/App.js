import React, { useState } from "react";
import Constants from './utilities/Constants'
import PostCreateForm from "./components/PostCreateForm";
import PostUpdateForm from "./components/PostUpdateForm";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [showingCreateNewPostForm, setShowingCreateNewPostForm] = useState(false);
  const [postCurrentlyBeingUpdated, setPostCurrentlyBeingUpdated] = useState(null);

  function getPosts() {
    const url = Constants.API_URL_GET_ALL_POSTS;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(postsFromServer => {
        console.log(postsFromServer);
        setPosts(postsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deletePost(postId){
    const url = `${Constants.API_URL_DELETE_POST_BY_ID}/${postId}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        onPostDeleted(postId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function renderPostsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">ID (PK)</th>
              <th scope="col">Titulo</th>
              <th scope="col">Contenido</th>
              <th scope="col">Operaciones CRUD</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.postId}>
                <th scope="row">{post.postId}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button onClick={() => setPostCurrentlyBeingUpdated(post)} className="btn btn-dark btn-lg mx-3 my-3">Actualizar</button>
                  <button onClick={() => { if(window.confirm(`Estas seguro de que quieres eliminar el post "${post.title}"?`)) deletePost(post.postId) }}className="btn btn-secondary btn-lg">Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setPosts([])} className="btn btn-dark btn-large w-100">Limpiar Posts</button>
      </div>
    );
  }

  function onPostCreated(createPost) {
    setShowingCreateNewPostForm(false);

    if (createPost === null) {
      return;
    }

    alert(`Post creado. Después de hacer clic en OK, tu post ${createPost.title} creado se mostrará`);
    getPosts();
  }

  function onPostUpdated(updatedPost) {
    setPostCurrentlyBeingUpdated(null)

    if (updatedPost === null) {
      return;
    }

    let postsCopy = [...posts];
    const index = postsCopy.findIndex(postsCopyPost => postsCopyPost.postId === updatedPost.postId);

    if (index !== -1){
      postsCopy[index] = updatedPost;
    }
    setPosts(postsCopy);

    alert(`Post actualizado. Después de hacer clic en OK, tu post ${updatedPost.title} actualizado se mostrará`);
  }

  function onPostDeleted(deletedPostId) {
    let postsCopy = [...posts];
    const index = postsCopy.findIndex(postsCopyPost => postsCopyPost.postId === deletedPostId);

    if (index !== -1) {
      postsCopy.splice(index, 1);
    }
    setPosts(postsCopy);

    alert('Post eliminado. Después de hacer clic en OK, verás que ha desaparecido.');
}


  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(showingCreateNewPostForm === false && postCurrentlyBeingUpdated === null) && (
            <div>
              <h1>ASP.NET Core + React</h1>
              <div className="mt-5">
                <button onClick={getPosts} className="btn btn-dark btn-lg w-100">Cargar posts del servidor</button>
                <button onClick={() => setShowingCreateNewPostForm(true)} className="btn btn-secondary btn-lg w-100 mt-4">Crear un nuevo post</button>
              </div>
            </div>
          )}
          {(posts.length > 0 && showingCreateNewPostForm === false && postCurrentlyBeingUpdated === null) && renderPostsTable()}
          {showingCreateNewPostForm && <PostCreateForm onPostCreated={onPostCreated} />}
          {postCurrentlyBeingUpdated !== null && <PostUpdateForm post={postCurrentlyBeingUpdated} onPostUpdated={onPostUpdated}/>}
        </div>
      </div>
    </div>
  );
}
