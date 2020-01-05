import React, { Component } from "react";
import { GiftedChat, View, Send, Image } from "react-web-gifted-chat";
import conversation from "./conversation.json";
import PropTypes from "prop-types";
import emojiUtils from "emoji-utils";
import SlackMessage from "./SlackMessage";

const rt_messages = [];

let msg_counter = 0;
rt_messages.push(
  generateMessage(`Idylla 2`, 3, {
    image:
      "https://www.wykop.pl/cdn/c3201142/comment_Sc8p2KAVLx3EyNIpXuOXngk3ZYJ0g8eq.jpg"
  })
);
rt_messages.push(
  generateMessage(`Goood 1`, 2, {
    image: "http://img2.dmty.pl//uploads/201010/1286036107_by_julia2332_600.jpg"
  })
);
rt_messages.push(
  generateMessage(`This is a great example of system message`, 2, {
    system: true
  })
);
rt_messages.push({
  id: Math.round(Math.random() * 1000000),
  text: "Hello developer",
  createdAt: new Date(),
  user: {
    id: 2,
    name: "React",
    avatar: "https://facebook.github.io/react/img/logo_og.png"
  }
});

function generateMessage(text, index, additionalData) {
  return {
    id: Math.round(Math.random() * 1000000),
    text: text,
    createdAt: new Date(),
    user: {
      id: index % 3 === 0 ? 1 : 2,
      name: "Johniak"
    },
    ...additionalData
  };
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
    this.onSend = this.onSend.bind(this);
  }
  componentDidMount() {
    console.log("mount");
    this.onSend();
  }
  renderLoading() {
    return <div>Loading...</div>;
  }
  renderComposer(props) {
    return <span />;
  }
  renderSend(props) {
    return (
      <Send {...props}>
        <span>Tap to continue</span>
      </Send>
    );
  }
  onSend(messages = []) {
    if (msg_counter < conversation.length) {
      this.setState(
        previousState => ({
          messages: GiftedChat.append(
            previousState.messages,
            conversation[msg_counter]
          )
        }),
        () => msg_counter++
      );
    }
  }
  renderMessage(props) {
    const {
      currentMessage: { text: currText }
    } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
      };
    }
    return <SlackMessage {...props} messageTextStyle={messageTextStyle} />;
  }
  render() {
    return (
      <div className="App" style={styles.container}>
        <div style={styles.chat}>
          <GiftedChat
            user={{ id: 1 }}
            showUserAvatar={false}
            renderAvatarOnTop={true}
            showAvatarForEveryMessage={false}
            messages={this.state.messages}
            onSend={this.onSend}
            renderComposer={this.renderComposer}
            renderSend={this.renderSend}
            alwaysShowSend={true}
            renderMessage={this.renderMessage}
          />
        </div>
      </div>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "100vh"
  },
  conversationList: {
    display: "flex",
    flex: 1
  },
  chat: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    borderWidth: "1px",
    borderColor: "#ccc",
    borderRightStyle: "solid",
    borderLeftStyle: "solid",
    textAlign: "left"
  },
  converationDetails: {
    display: "flex",
    flex: 1
  }
};

export default App;
