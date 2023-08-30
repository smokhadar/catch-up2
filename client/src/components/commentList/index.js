import React from 'react';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <h4
        className="p-5 display-inline-block"
        style={{ marginTop: '20px', marginLeft: '80px', marginBottom: '25px', textAlign: 'left' }}
      >
        Comments
      </h4>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header" 
                    style={{ textAlign: 'left', marginLeft: '80px' }}>
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="text" style={{ marginBottom: '20px', marginLeft: '80px', textAlign:'left' }}>{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
