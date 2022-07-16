import React, { Component } from "react";
import PubSub from "pubsub-js";
import "./index.css";

export default class index extends Component {
  state = { userList: [], isLoding: false, isInit: true, err: "" };

  componentDidMount() {
    //监听订阅的发布，如果有此SEARCH USER LIST则去调用后面的this.updateState回调
    this.token = PubSub.subscribe("SEARCH USER LIST", this.updateState);
  }

  componentWillUnmount() {
    //取消订阅
    PubSub.unsubscribe(this.token);
  }

  updateState = (_, stateObj) => {
    this.setState(stateObj);
  };

  render() {
    const { userList, isLoding, isInit, err } = this.state;

    return (
      <div className="row">
        {isLoding ? (
          <p>Loding...</p>
        ) : isInit ? (
          <p>欢迎使用github查询用户系统</p>
        ) : err ? (
          <p style={{ color: "red" }}>{err}</p>
        ) : (
          userList.map((user) => {
            return (
              <div className="card" key={user.id}>
                <a rel="noreferrer" href={user.html_url} target="_blank">
                  <img
                    src={user.avatar_url}
                    style={{ width: "100px" }}
                    alt="user-avatar"
                  />
                </a>
                <p className="card-text">reactjs</p>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
