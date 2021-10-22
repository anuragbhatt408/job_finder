import { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import { postArticleApi } from "../actions";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };
  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };
  const postArticle = (e) => {
    console.log("post");
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };

    props.postArticle(payload);
    reset(e);
  };
  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button
                onClick={(e) => {
                  reset(e);
                }}
              >
                <img src="/images/close-icon.svg"></img>
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL}></img>
                ) : (
                  <img src="/images/user.svg"></img>
                )}

                {props.user && props.user.displayName ? (
                  <span>{props.user.displayName}</span>
                ) : (
                  <span>Name</span>
                )}
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="Post A Job "
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, images/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an image to share</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/photo-icon.png"></img>
                </AssetButton>
                <AssetButton onClick={() => setAssetArea("media")}>
                  <img src="/images/video-icon.png"></img>
                </AssetButton>
              </AttachAssets>
              <ShareCommment>
                <AssetButton>
                  <img src="/images/comments-icon.png"></img>
                  Anyone
                </AssetButton>
              </ShareCommment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgb(51, 51, 51);
  font-weight: 400;
  align-items: center;
  button {
    width: 22px;
    background: transparent;
    border: none;
    svg,
    img {
      pointer-events: none;
    }
    :hover {
      cursor: pointer;
    }
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  png,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;
const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  img {
    height: 22px;
  }
`;
const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;
const ShareCommment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    margin-right: 5px;
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.4)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1, 1, 1, 0.8)" : "white")};
  :hover {
    background: ${(props) =>
      props.disabled ? "rgba(0, 0, 0, 0.8)" : "#004182"};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleApi(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
