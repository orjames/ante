import React from 'react';
import { FeedComment } from './FeedComment';
import FeedImage from './FeedImage';
import FeedFavoriteButton from './FeedFavoriteButton';
import FeedComments from './FeedComments';
import FeedDeletePost from './FeedDeletePost';
import NavIcon from './images/location-arrow-solid';
import FeedText from './FeedText';
import FeedAboveImage from './FeedAboveImage';
import { roundNumber } from './functions/roundNumber';
import { calculateDistance } from './functions/calculateDistance';
import { convertDate } from './functions/convertDate';
import { PostInterface, LocationInterface, UserInterface, FeedOptions } from './types/react-app-env'

interface Props {
  feedToggle: FeedOptions;
  location: LocationInterface;
  addToFavorites: (post: PostInterface) => void;
  removeFromFavorites: (post: PostInterface) => void;
  refreshPosts: (postData: PostInterface[]) => void;
  deletePost: (e: React.MouseEvent<Element, MouseEvent>, pid: string) => void;
  user: UserInterface;
  posts: PostInterface[];
}

const Feed = (props: Props) => {
  let posts;
  // rounds distance to 2 places
  const round = roundNumber();
  // calculates distance given input long and lat and stored user long lat
  const distance = calculateDistance(props.location, round);
  // converts updatedAt time to more readable string
  const dateConverter = convertDate();
  // if there are any posts
  if (props.posts !== null) {
    posts = props.posts.map((post: PostInterface, index: number) => {
      let tags = post.tags.map((tag: string, index: number) => {
        return (
          <span className='link' key={index}>
            {tag}
          </span>
        );
      });
      return (
        <div className='feed-item-div' key={index}>
          <FeedAboveImage post={post} distance={distance} />
          <FeedImage post={post} />
          <div className='sub-image-div'>
            <div className='sub-image-buttons-div'>
              <FeedFavoriteButton
                post={post}
                user={props.user}
                removeFromFavorites={props.removeFromFavorites}
                addToFavorites={props.addToFavorites}
              />
              <FeedComment
                user={props.user}
                refreshPosts={props.refreshPosts}
                post={post}
              />
              <FeedDeletePost
                post={post}
                user={props.user}
                deletePost={props.deletePost}
              />
            </div>
            <div className='distance-div'>
              <NavIcon fill={'rgb(242, 159, 5)'} className='fav-button' />
              {distance(post.location.lat, post.location.long)} mi.
            </div>
          </div>
          <FeedText
            dateConverter={dateConverter}
            distance={distance}
            post={post}
            tags={tags}
          />
          <FeedComments post={post} />
        </div>
      );
    });
  } else {
    posts = <span>no posts</span>;
  }

  return <div>{posts}</div>;
};

export default Feed;
