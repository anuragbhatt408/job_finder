import styled from "styled-components";

const Main = (props) => {
  return (
    <Container>
      <ShareBox>
        Share
        <div>
          <img src="./images/user.svg" alt=""></img>
          <button>Start a post</button>
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
      <div>
        <Article>
          <SharedActor>
            <a>
              <img src="./images/user.svg" alt=""></img>
              <div>
                <span>Title</span>
                <span>Info</span>
                <span>Date</span>
              </div>
            </a>
            <button>
              <img src="./images/ellipses.png" alt=""></img>
            </button>
          </SharedActor>
          <Description>Desc</Description>
          <SharedImg>
            <a>
              <img
                src="https://images.unsplash.com/photo-1633668803757-40926829820b?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
                alt=""
              ></img>
            </a>
          </SharedImg>
          <SocialCounts>
            <li>
              <button>
                <img
                  src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                  alt=""
                />
                <img
                  src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
                  alt=""
                />
                <span>100 Likes</span>
              </button>
            </li>
            <li>
              <a
                style={{
                  margin: "5px",
                }}
              >
                10 comments
              </a>
            </li>
          </SocialCounts>
          <SocialActions>
            <button>
              <img src="./images/like-icon.png" alt=""></img>
              <span>Likes</span>
            </button>
            <button>
              <img src="./images/comments-icon.png" alt=""></img>
              <span>Comments</span>
            </button>
            <button>
              <img src="./images/share-icon.png" alt=""></img>
              <span>Share</span>
            </button>
            <button>
              <img src="./images/send-icon.png" alt=""></img>
              <span>Send</span>
            </button>
          </SocialActions>
        </Article>
      </div>
    </Container>
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
    color: rgba(0, 0, 0, 0.8);
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
export default Main;
