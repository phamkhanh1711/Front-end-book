function ListComment(props) {
  const { comments } = props;
    function renderList() {
      if (!comments) {
             return null;
         }
    
        return comments.map((comment) => (
          <li className="media" key = {comment.id}>
            <a className="pull-left" href="#">
              <img className="media-object" src={"http://localhost:8080/laravel8/public/upload/blog/detail/image/" + comment.image_user} alt="" />

            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li><i className="fa fa-user" /> {comment.name_user}</li>
                <li><i className="fa fa-clock-o" />  {comment.created_at}</li>
                <li><i className="fa fa-calendar" /> {comment.updated_at}</li>
              </ul>
              <p>{comment.comment}</p>
              <a className="btn btn-primary" href><i className="fa fa-reply" />Reply</a>
            </div>
          </li>
        ));
       }
  return (
    <div className="response-area">
      <h2> RESPONSES</h2>
      <ul className="media-list">
        {renderList()}
      </ul>
    </div>
  );
}
export default ListComment;

