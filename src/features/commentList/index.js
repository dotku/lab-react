import React from "react"

function Comment({ text }) {
  return <span>{text}</span>;
}

// console.log([...nestComments(comments)]);
function CommentList({ comments }) {
  console.log("CommentList", comments);
  let items = comments.map((comment, idx) => {
    return (
      <div className="border-left pl-3" key={idx}>
        <Comment text={comment.id} />
        {comment.children && CommentList({ comments: comment.children })}
      </div>
    );
  });

  return items;
}
// export default function App() {
//   console.log("app");
//   return <div>{<CommentList comments={nestComments(comments)} />}</div>;
// }
export default class App extends React.Component {
  state = {
    comments: [
      {
        id: 1,
        parentId: null
      },
      {
        id: 2,
        parentId: 1
      },
      {
        id: 3,
        parentId: 1
      },
      {
        id: 4,
        parentId: 2
      },
      {
        id: 5,
        parentId: 4
      },
      {
        id: 6,
        parentId: null
      }
    ]
  };
  componentDidMount() {
    console.log("componentDidMount");
    // force render
    let { comments } = this.state;
    comments.push({
      id: 7,
      parentId: null
    });
    comments = this.nestComments(comments);
    // this.setState(({ comments }) => ({
    //   comments: this.nestComments(comments)
    // }));
    this.setState({ comments });
    console.log("2nd", comments, this.nestComments(comments));
    this.setState({ comments: this.nestComments(comments) });
    // !important: React will ignore the update after setState
    comments.push({
      id: 8,
      parentId: null
    });
    // this.setState({ comments: this.nestComments(comments) });
  }
  nestComments = (commentList) => {
    console.log("nestComments 1", commentList);
    const commentMap = {};

    // move all the comments into a map of id => comment
    commentList.forEach((comment) => (commentMap[comment.id] = comment));
    console.log("nestComments 2", commentList);

    // iterate over the comments again and correctly nest the children
    commentList.forEach((comment) => {
      if (comment.parentId !== null) {
        const parent = commentMap[comment.parentId];
        (parent.children = parent.children || []).push(comment);
      }
    });

    // filter the list to return a list of correctly nested comments
    console.log("nestComments 3", commentList);
    debugger;
    const result = commentList.filter((comment) => {
      // console.log("nestComments 3 commnetList", commentList);
      console.log("nestComments 3 commnet", comment);
      return comment.parentId === null;
    });
    console.log("nestComments 4", result);
    return result;
  };
  render() {
    const { comments } = this.state;
    console.log("Render", comments);
    return <div>{<CommentList comments={comments} />}</div>;
  }
}
