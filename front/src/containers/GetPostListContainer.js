import { connect } from "react-redux";
import PostList from "~/components/post/PostList";

const mapStateToProps = (state) => {
  const length = state.posts.length;
  const currentState = state.posts[length - 1]; // 一番新しいstateを取り出す
  return { posts: currentState.items }; // 描画するのに必要なのはとりあえずitemsだけなのでitemsだけ返す
};

const GetPostList = connect(mapStateToProps)(PostList);

export default GetPostList;
