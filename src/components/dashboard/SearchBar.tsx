import * as React from "react";
import { connect } from "react-redux";

// import { Actions } from "../../actions/posts";
// import { IPostDetails } from "../../interface";
// import { interpolate } from "../../utils/string";

import * as postService from "../../services/posts";
// import * as routes from "../../constants/routes";

interface IBlogListProps {
  postDetails: any;
  // savePost: (postDetails: Array<IPostDetails>) => void;
}

interface IBlogListState {
  postList: any;
  items: any;
  searchString: string;
}

class SearchBar extends React.Component<IBlogListProps, IBlogListState> {
  constructor(props: Readonly<IBlogListProps>) {
    super(props);
    console.log("props", props);
    this.state = {
      postList: props.postDetails,
      items: [],
      searchString: ""
    };
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps !== this.props) {
      this.setState({
        postList: this.props.postDetails
      });
    }
  }

  handleSearch = (event: any) => {
    event.preventdefault();
    console.log(event.target.value);
    this.setState({
      searchString: event.target.value
    });
  };

  handleChange = (e: any) => {
    this.setState({
      searchString: e.target.value
    });
  };

  onSearch = async () => {
    // e.preventdefault();

    const posts = await postService.fetchByQueryParams(this.state.searchString);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>", posts);
  };

  render() {
    return (
      <div className="container">
        <div className="block hidden-md">
          <div className="block__content">
            <div className="Block-white">
              <div className="form-section">
                <form>
                  <label>
                    Name:
                    <input
                      name="searchString"
                      value={this.state.searchString}
                      onChange={e => this.handleChange(e)}
                    />
                  </label>

                  <div onClick={e => this.onSearch}>Send</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const PostList: React.SFC<IPostList> = props => {
//   const { postInfo, key } = props;
//   return (
//     <div className="tabs__content" key={key}>
//       <div className="tabs__content__pane active" id="advertisement">
//         <div className="Block-white Block-product">
//           <div className="Block-product__content">
//             <h2>
//               {postInfo.title}
//               <span className="Batch Batch--yellow Batch--icon">
//                 {postInfo.users ? postInfo.users.name : "User not found"}
//               </span>
//             </h2>
//             <span className="publisher">Description:</span>
//             <span className="budget">{postInfo.description}</span>
//           </div>
//           <Link
//             to={interpolate(routes.BLOGS_INFO, {
//               id: postInfo._id
//             })}
//             className="Block-product__btn btn btn--blue"
//           >
//             DETAILS
//           </Link>{" "}
//         </div>
//       </div>
//     </div>
//   );
// };
const mapStateToProps = ({ postReducer }: any) => {
  return { postDetails: postReducer.postDetails };
};

// const mapDispatchToProps = (dispatch: any) => ({
//   savePost: (postDetails: Array<IPostDetails>) =>
//     dispatch(Actions.storePosts(postDetails))
// });

export default connect(
  mapStateToProps,
  null
  // mapDispatchToProps
)(SearchBar);
