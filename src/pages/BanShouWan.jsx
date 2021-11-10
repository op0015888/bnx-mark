import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Space,
  Notification,
  Typography,
  Select,
} from "@douyinfe/semi-ui";
import { isMobile, ff } from "../utils/util";
import NowAddress from "../components/NowAddress";
import imgs from "../assets/img";

const { Option } = Select;

const MyHeroContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
`;

const BanShouWan = ({ address, contracts }) => {
  const [myCardSelectedList, setMyCardSelectedList] = useState([]);
  const [myHeroList, setMyHeroList] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [mxlist, setMxList] = useState([]);
  const [workLoad, setWorkLoad] = useState(false);
  useEffect(() => {
    setselectedRowKeys([]);
    setMyCardSelectedList([]);
    Hero();
  }, [address]);

  const Hero = async () => {
    if (!address || !contracts) {
      Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
      return;
    }
    setselectedRowKeys([]);
    setMyHeroList([]);
    setMyCardSelectedList([]);
    setWorkLoad(true)
    const nums = await contracts.amzContract.methods.balanceOf(address).call({
      from: address,
    });
    let promises = [];
    for (let index = 0; index < nums; index++) {
      promises.push(
        contracts.amzContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call({
            from: address,
          })
          .catch((err) => console.log(err))
      );
    }
    const ids = await Promise.all(promises);
    promises = [];
    ids.forEach((id) => {
      promises.push(
        contracts.amzContract.methods
          .getArmz(id)
          .call({
            from: address,
          })
          .catch((err) => console.log(err))
      );
    });
    const infos = await Promise.all(promises);
    setMyHeroList(infos.sort((a, b) => tureMana(a) - tureMana(b)));
    setWorkLoad(false)
  };

  const tureMana = (record) => {
    let s = parseInt(record.mana),
      e = parseInt(record.maxMana);
    if (s < e) {
      let a = parseInt(
        (Math.floor(Date.now() / 1000) - record.lastFight) /
          3600 /
          record.hourMana
      );
      s += a;
      if (s > record.maxMana) s = record.maxMana;
    }
    return parseInt(s);
  };
  return (
    <MyHeroContainer>
      <Typography.Title style={{ textAlign: "center" }}>
        扳手腕
      </Typography.Title>
      <NowAddress address={address} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          flexWrap: "wrap",
        }}
      >
        <Button
          type="primary"
          style={{ margin: 3 }}
          onClick={() => {
            if (!address || !contracts) {
              Notification.error({ content: "请刷新网页" });
              return;
            }
            if (mxlist.length > 0) {
              ff(
               (mxlist.length >= 30
                  ? 0.0006
                  : mxlist.length >= 20
                  ? 0.001
                  : mxlist.length >= 10
                  ? 0.002
                  : 0.003) * mxlist.length,
                address,
                () => {
                  mxlist.forEach((item) => {
                    console.log(tureMana(item))
                    for (let index = 0; index < tureMana(item); index++) {
                      contracts.fightContract.methods
                        .fight(item.id, item.boss || 0)
                        .send({
                          from: address,
                          gas: 500000
                        })
                        .then((r) => Hero())
                        .catch((e) => console.log(e));
                    }
                  });
                }
              );
            } else {
              Notification.error({ content: "请选择英雄" });
            }
          }}
        >
          开扳
        </Button>
        <Button
          type="primary"
          disabled={myHeroList.filter((item) => tureMana(item) === item.maxMana).length === 0}
          style={{ margin: 3 }}
          onClick={() => {
            if (!address || !contracts) {
              Notification.error({ content: "请刷新网页" });
              return;
            }
            const mt = myHeroList.filter((item) => tureMana(item) === item.maxMana)
            if (mt.length > 0) {
              ff(
               (mt.length >= 30
                  ? 0.0006
                  : mt.length >= 20
                  ? 0.001
                  : mt.length >= 10
                  ? 0.002
                  : 0.003) * mt.length,
                address,
                () => {
                  mt.forEach((item) => {
                    // console.log(tureMana(item))
                    for (let index = 0; index < tureMana(item); index++) {
                      contracts.fightContract.methods
                        .fight(item.id, item.boss || 0)
                        .send({
                          from: address,
                          gas: 500000
                        })
                        .then((r) => Hero())
                        .catch((e) => console.log(e));
                    }
                  });
                }
              );
            } else {
              Notification.error({ content: "请选择英雄" });
            }
          }}
        >
          满体力开扳
        </Button>
        <Button type="primary" style={{ margin: 3 }} onClick={Hero}>
          刷新
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          flexWrap: "wrap",
        }}
      >
        <Space
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Tag style={{ textAlign: "center" }}>手腕 {myHeroList.length}</Tag>
          <Tag color="yellow" style={{ textAlign: "center" }}>
            剩余满体力手腕{" "}
            {myHeroList.filter((item) => tureMana(item) === item.maxMana).length}
          </Tag>
          <Tag color="green" style={{ textAlign: "center" }}>
            总手腕次数{" "}
            {myHeroList.reduce((pre, item) => pre + Number(item.maxMana), 0)}
          </Tag>
          <Tag color="red" style={{ textAlign: "center" }}>
            剩余手腕次数{" "}
            {myHeroList.reduce((pre, item) => pre + tureMana(item), 0)}
          </Tag>
        </Space>
      </div>
      <p style={{ width: "100%", textAlign: "center" }}>
        每次点击开扳按钮前, 都需要支付一笔手续费,
        费用为一手腕0.003BNB,高于10手腕费用为0.002BNB,高于20手腕费用为0.001BNB,高于30手腕费用为0.0006BNB
      </p>
      {myCardSelectedList.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 5,
            flexWrap: "wrap",
          }}
        >
          <p>已选中: {myCardSelectedList.length}</p>
        </div>
      ) : (
        ""
      )}
      <Table
        loading={workLoad}
        rowKey={(record) => record.id}
        columns={
          isMobile()
            ? [
                {
                  title: "手腕",
                  dataIndex: "image",
                  render: (text) => {
                    const img = imgs.filter(img => {
                      return img.indexOf(text) != -1
                    })
                    return <img src={`https://app.armzlegends.com/img/${img[0] || 'MISC_EARN.32a6591b.png'}`} style={{width: 30, height: 30}}/>
                  }
                },
                {
                  title: "体力",
                  dataIndex: "mana",
                  sorter: (a, b) => tureMana(a) - tureMana(b),
                  render: (text, record) => {
                    return (
                      <span>
                        {tureMana(record)}
                      </span>
                    );
                  },
                },
                {
                  title: "倒计时",
                  dataIndex: "djs",
                  render: (text, record) => {
                    const time = ((Math.floor(Date.now() / 1000) - record.lastFight)/ 3600)
                    return <span>{Math.ceil(record.hourMana - time).toFixed()}</span>
                  }
                },
                {
                  title: "BOSS",
                  render: (text, record) => {
                    return (
                      <Select
                        size="small"
                        defaultValue={0}
                        onChange={(value) => {
                          record["boss"] = value;
                        }}
                      >
                        <Option value={0} key={0}>
                          {"简单"}
                        </Option>
                        <Option value={1} key={1}>
                          {"普通"}
                        </Option>
                        <Option value={2} key={2}>
                          {"困难"}
                        </Option>
                      </Select>
                    );
                  },
                },
              ]
            : [
                {
                  title: "ID",
                  dataIndex: "id",
                  sorter: (a, b) => a.id - b.id,
                },
                {
                  title: "手腕",
                  dataIndex: "image",
                  render: (text) => {
                    const img = imgs.filter(img => {
                      return img.indexOf(text) != -1
                    })
                    return <img src={`https://app.armzlegends.com/img/${img[0] || 'MISC_EARN.32a6591b.png'}`} style={{width: 40, height: 40}}/>
                  }
                },
                {
                  title: "体力",
                  dataIndex: "mana",
                  sorter: (a, b) => tureMana(a) - tureMana(b),
                  render: (text, record) => {
                    const mana = tureMana(record)
                    return (
                      <span style={{display: 'flex', alignItems: 'center'}}>
                        {mana}/{record.maxMana}
                        {
                          mana === record.maxMana ? <Tag color='yellow'>满</Tag> : ""
                        }
                      </span>
                    );
                  },
                },
                {
                  title: "恢复体力(小时)",
                  dataIndex: "hourMana",
                  sorter: (a, b) => a.hourMana - b.hourMana,
                },
                {
                  title: "倒计时(小时)",
                  dataIndex: "djs",
                  sorter: (a, b) => (Math.floor(Date.now() / 1000) - a.lastFight) - (Math.floor(Date.now() / 1000) - b.lastFight),
                  render: (text, record) => {
                    const time = ((Math.floor(Date.now() / 1000) - record.lastFight)/ 3600)
                    return <span>{(record.hourMana - time).toFixed(2)}</span>
                  }
                },
                {
                  title: "最后时间",
                  dataIndex: "lastFight",
                  sorter: (a, b) => a.lastFight - b.lastFight,
                  render: (text) => {
                    return (
                      <span>{new Date(text * 1000).toLocaleDateString()}</span>
                    );
                  },
                },
                {
                  title: "rarity",
                  dataIndex: "rarity",
                  sorter: (a, b) => a.rarity - b.rarity,
                },
                {
                  title: "nbBoost",
                  dataIndex: "nbBoost",
                  sorter: (a, b) => a.nbBoost - b.nbBoost,
                },
                {
                  title: "boostWinrate",
                  dataIndex: "boostWinrate",
                  sorter: (a, b) => a.boostWinrate - b.boostWinrate,
                },
                {
                  title: "选择BOSS",
                  render: (text, record) => {
                    return (
                      <Select
                        size="small"
                        defaultValue={0}
                        onChange={(value) => {
                          record["boss"] = value;
                        }}
                      >
                        <Option value={0} key={0}>
                          {"简单"}
                        </Option>
                        <Option value={1} key={1}>
                          {"普通"}
                        </Option>
                        <Option value={2} key={2}>
                          {"困难"}
                        </Option>
                      </Select>
                    );
                  },
                },
              ]
        }
        dataSource={myHeroList}
        pagination={{
          formatPageText: !isMobile(),
        }}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setMxList(selectedRows);
            setselectedRowKeys(selectedRowKeys);
          },
          getCheckboxProps: (record) => ({
            disabled: tureMana(record) === 0,
          }),
        }}
        bordered
      />
    </MyHeroContainer>
  );
};

export default BanShouWan;
