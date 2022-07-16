import React, { Component } from "react";
import PubSub from "pubsub-js";
import axios from "axios";

export default class index extends Component {
  handleSearch = async () => {
    //发布订阅
    PubSub.publish("SEARCH USER LIST", {
      isLoding: true,
      isInit: false,
    });

    const {
      searchNode: { value },
    } = this;

    if (value !== "") {
      try {
        const userDataRes = await axios.get(
          `http://localhost:3000/api/search/users2?q=${value}`
        );

        PubSub.publish("SEARCH USER LIST", {
          userList: userDataRes.data.items,
          isLoding: false,
        });
      } catch (err) {
        PubSub.publish("SEARCH USER LIST", {
          err: err.message,
          isLoding: false,
        });
      }
    }
  };

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">搜索github用户</h3>
        <div>
          <input
            ref={(node) => {
              this.searchNode = node;
            }}
            type="text"
            placeholder="请输入你要查询的用户"
          />
          &nbsp;
          <button onClick={this.handleSearch}>搜索</button>
        </div>
      </section>
    );
  }
}
