// ListComment_TT.js

import React, { useEffect, useState } from "react";
import axios from "axios";

function ListComment_TT(props) {
  const { book_id } = props;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const apiUrl = `http://localhost:8081/comments/book/${book_id}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [book_id]);

  function renderList() {
    if (!comments || comments.length === 0) {
      return <li>No comments yet.</li>;
    }

    return comments.map((comment) => (
      <li className="media" key={comment.id}>
        <a className="pull-left" href="#"></a>
        <div className="media-body">
          <ul className="sinlge-post-meta">
            <li>
              <i className="fa fa-user" /> {comment.name_user}
            </li>
            <li>
              <i className="fa fa-clock-o" /> {comment.created_at}
            </li>
            <li>
              <i className="fa fa-calendar" /> {comment.updated_at}
            </li>
          </ul>
          <p>{comment.comments}</p>
          <a className="btn btn-primary" href="#">
            <i className="fa fa-reply" />
            Reply
          </a>
        </div>
      </li>
    ));
  }

  return (
    <div className="response-area">
      <h2>RESPONSES</h2>
      <ul className="media-list">{renderList()}</ul>
    </div>
  );
}

export default ListComment_TT;
