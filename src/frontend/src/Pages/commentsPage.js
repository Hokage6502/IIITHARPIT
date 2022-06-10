import Comment from "../Components/Comment";
import { CommentBox, CommentButton } from "../Components/CommentBox";
import { comments } from "../temp_data";

export default function CommentsPage({datasetID}) {

    return (
      <>
        <CommentBox button={<CommentButton />}/>
          {comments.map((comment) => <Comment comment={comment} level={0}/>)}
      </>
    )
}