import styled from "styled-components";
import PostModal from "./PostModal";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getArticlesApi } from "../actions";

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    if (e.target != e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <>
      <Container>
        <ShareBox>
          <div>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL}></img>
            ) : (
              <img src="/images/user.svg"></img>
            )}
            <button
              onClick={handleClick}
              disabled={props.loading ? true : false}
            >
              Start a post
            </button>
          </div>
          <div>
            <button>
              <img src="./images/photo-icon.png" alt=""></img>
              <span>Photo</span>
            </button>
            <button>
              <img src="./images/video-icon.png" alt=""></img>
              <span>Video</span>
            </button>
            <button>
              <img src="./images/event-icon.png" alt=""></img>
              <span>Event</span>
            </button>
            <button>
              <img src="./images/article-icon.png" alt=""></img>
              <span>Write Article</span>
            </button>
          </div>
        </ShareBox>
        {props.articles.length === 0 ? (
          <p>There are no articles</p>
        ) : (
          <Content>
            {props.loading && <img src="/images/spin-loader.svg" />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image}></img>
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src="/images/ellipsis.png" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {!article.sharedImg && article.video ? (
                        <ReactPlayer
                          width={"100%"}
                          url={article.video}
                        ></ReactPlayer>
                      ) : (
                        article.sharedImg && <img src={article.sharedImg}></img>
                      )}
                    </a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"></img>
                        <img src="/images/clapping.png" />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments}</a>
                    </li>
                  </SocialCounts>

                  <SocialActions>
                    <button>
                      <img src="/images/like-icon.png" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src="/images/comments-icon.png" />
                      <span>Comment</span>
                    </button>
                    <button>
                      <img src="/images/share-icon.png"></img>
                      <span>Share</span>
                    </button>
                    <button>
                      <img src="/images/send-icon.png"></img>
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
        )}
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 0.15), 0 0 0 rgb(0 0 0 /0.2);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.6);
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 40px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 40px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0px;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 2px solid #333333;
        background-color: white;
        text-align: left;
      }
    }
      &:nth-child(2) {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding-bottom: 4px;
        button {
          img {
            margin: 0 4px 0 -2px;
          }
          span {
            color: #70b5f9;
          }
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0px;
  margin: 0 0 8px;
  overflow: visible;
  color: black;
  font-weight: 500;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      height: 48px;
      width: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 800;
          color: rgba(0, 0, 0, 2);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.9);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  /* background-color:#f9fafb; */
  text-align: start;
  margin-left: 20px;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SharedImg = styled.div`
  display: block;
  position: relative;
  margin-top: 8px;
  width: 100%;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0px;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 13px;
    letter-spacing: 0.4px;
    font-weigt: 600;
    button {
      display: flex;
      border: none;
      background-color: white;
    }
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  margin: 0;
  min-height: 40px;
  padding: 8px;
  button {
    display: inline-flex;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 12px;
    padding: 8px;
    margin-left: 10px;
    color: rgba(0, 0, 0, 0.9);
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesApi()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
