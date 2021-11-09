import styled from "styled-components";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { BigNumber } from "bignumber.js";
import {
  Table,
  Button,
  Input,
  Tag,
  Space,
  Notification,
  Popconfirm,
  Typography,
  Modal,
  InputNumber,
} from "@douyinfe/semi-ui";
import { MyHeroColums, MyHeroMColums } from "../utils/colums";
import { isMobile, filterHegeOne, initWeb3 } from "../utils/util";
import {
  Robber,
  Warrior,
  Ranger,
  Mage,
  Katrina,
  Addresss,
  names,
} from "../utils/emuns";
import NowAddress from "../components/NowAddress";
const MyHeroContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
`;

const MyHero = ({ address, contracts }) => {
  const [heroLoad, setHeroLoad] = useState(false);
  const [jianzhi, setJianzhi] = useState(false); // 兼职按钮
  const [second, setSecond] = useState(false); // 2级工作
  const [myCardSelectedList, setMyCardSelectedList] = useState([]);
  const [myHeroList, setMyHeroList] = useState([]);
  const [msnums, setMsNums] = useState(0);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [mssnums, setMssNums] = useState(0);
  const [transferAddress, setTransferAddress] = useState("");
  const [cardNum, setCardNum] = useState({
    b: 0,
    h: 0,
    levels: [],
    hightLevel: 1,
  });
  const [bnx, setBnx] = useState(0);
  const [Inkey, setInKey] = useState(0);
  const [gold, setGold] = useState(0);
  const [saleModal, setSaleModal] = useState(false);
  const [saleRecord, setSaleRecord] = useState([]);
  const [saleModalPrice, setSaleModalPrice] = useState(8.88);

  useEffect(() => {
    setselectedRowKeys([]);
    Hero();
    getBnxGold();
  }, [address]);

  const getBnxGold = () => {
    if (!address || !contracts) {
      Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
      return;
    }
    contracts.goldContractNew.methods
      .balanceOf(address)
      .call()
      .then((res) => {
        setGold((Number(res) / Math.pow(10, 18)).toFixed(4));
      })
      .catch((err) => console.log(err));
    contracts.bnxContractNew.methods
      .balanceOf(address)
      .call()
      .then((res) => {
        setBnx((Number(res) / Math.pow(10, 18)).toFixed(4));
      })
      .catch((err) => console.log(err));
    contracts.keyContractNew.methods
      .balanceOf(address)
      .call()
      .then((res) => {
        setInKey(Number(res) / Math.pow(10, 18));
      })
      .catch((err) => console.log(err));
  };

  const Hero = async () => {
    if (!address || !contracts) {
      Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
      return;
    }
    setselectedRowKeys([]);
    setMyHeroList([]);
    setHeroLoad(true);
    setJianzhi(false);
    setSecond(false);
    setMyCardSelectedList([]);
    const warrs = await contracts.WarriorContract.methods
      .balanceOf(address)
      .call()
      .catch((err) => console.log(err));
    const kars = await contracts.KatrinaContract.methods
      .balanceOf(address)
      .call()
      .catch((err) => console.log(err));
    const robbers = await contracts.RobberContract.methods
      .balanceOf(address)
      .call()
      .catch((err) => console.log(err));
    const mages = await contracts.MageContract.methods
      .balanceOf(address)
      .call()
      .catch((err) => console.log(err));
    const youxias = await contracts.youxiaContract.methods
      .balanceOf(address)
      .call()
      .catch((err) => console.log(err));
    const promises = [];
    for (let index = 0; index < warrs; index++) {
      promises.push(
        contracts.WarriorContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
          .catch((err) => console.log(err))
      );
    }
    for (let index = 0; index < robbers; index++) {
      promises.push(
        contracts.RobberContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
          .catch((err) => console.log(err))
      );
    }
    for (let index = 0; index < mages; index++) {
      promises.push(
        contracts.MageContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
          .catch((err) => console.log(err))
      );
    }
    for (let index = 0; index < youxias; index++) {
      promises.push(
        contracts.youxiaContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
          .catch((err) => console.log(err))
      );
    }
    for (let index = 0; index < kars; index++) {
      promises.push(
        contracts.KatrinaContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
          .catch((err) => console.log(err))
      );
    }

    Promise.all(promises).then((res) => {
      // console.log(res);
      const list = res.map(async (id) => {
        const info = await contracts.NewPlayInfoContract.methods
          .getPlayerInfoBySet(id)
          .call()
          .catch((err) => console.log(err));
        return {
          career_address: info[1],
          strength: Number(info[0][0]),
          agility: Number(info[0][1]),
          physique: Number(info[0][2]),
          volition: Number(info[0][3]),
          brains: Number(info[0][4]),
          charm: Number(info[0][5]),
          level: Number(info[0][6]),
          total:
            Number(info[0][0]) +
            Number(info[0][1]) +
            Number(info[0][2]) +
            Number(info[0][3]) +
            Number(info[0][4]) +
            Number(info[0][5]),
          token_id: id,
        };
      });
      Promise.all(list)
        .then(async (res) => {
          const nlist = res;
          const tokenids = nlist.map((item) => ({
            id: item.token_id,
            lv: item.level,
          }));
          const ms = nlist.reduce(
            (pre, item) => (item.level > 3 ? pre + item.level : pre + 3),
            0
          );
          fetch(
            `https://game.binaryx.pro/v1/dungeon/enternumber?GoldAddress=${address}&TokenIds=${JSON.stringify(
              tokenids
            )}`,
            {
              method: "POST",
              credentials: "include",
            }
          )
            .then((res) => res.json())
            .then((res) => {
              // console.log(res);
              let mss = 0;
              nlist.forEach((item) => {
                for (let ab = 0; ab < res.data.length; ab++) {
                  const child = res.data[ab];
                  if (item.token_id === child.id) {
                    nlist[ab]["num"] = child.num;
                    nlist[ab]["lv"] = 1;
                    nlist[ab]["l"] = 1;
                    mss += child.num;
                    break;
                  }
                }
              });
              setMsNums(ms);
              setMssNums(mss);
              setMyHeroList(nlist.sort((a, b) => b.num - a.num));

              const blocks = nlist.filter((record) => {
                let hege = false;
                switch (record.career_address) {
                  case Robber:
                    hege = filterHegeOne(record, Robber, "agility", "strength");
                    break;
                  case Ranger:
                    hege = filterHegeOne(record, Ranger, "strength", "agility");
                    break;
                  case Warrior:
                    hege = filterHegeOne(
                      record,
                      Warrior,
                      "strength",
                      "physique"
                    );
                    break;
                  case Katrina:
                    hege = filterHegeOne(
                      record,
                      Katrina,
                      "strength",
                      "physique"
                    );
                    break;
                  case Mage:
                    hege = filterHegeOne(record, Mage, "brains", "charm");
                    break;
                }
                return hege === false;
              });
              const heges = nlist.filter((record) => {
                let hege = false;
                switch (record.career_address) {
                  case Robber:
                    hege = filterHegeOne(record, Robber, "agility", "strength");
                    break;
                  case Ranger:
                    hege = filterHegeOne(record, Ranger, "strength", "agility");
                    break;
                  case Warrior:
                    hege = filterHegeOne(
                      record,
                      Warrior,
                      "strength",
                      "physique"
                    );
                    break;
                  case Katrina:
                    hege = filterHegeOne(
                      record,
                      Katrina,
                      "strength",
                      "physique"
                    );
                    break;

                  case Mage:
                    hege = filterHegeOne(record, Mage, "brains", "charm");
                    break;
                }
                return hege === true;
              });
              const hightLevel = heges.reduce((hight, record) => {
                return record.level > hight ? record.level : hight;
              }, 1);
              const levels = [];
              for (let i = 0; i < hightLevel; i++) {
                levels.push(
                  heges.filter((record) => record.level === i + 1).length
                );
              }
              setCardNum({
                b: blocks.length,
                h: heges.length,
                levels,
                hightLevel,
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
      setHeroLoad(false);
    });
  };
  const toJianZhi = () => {
    if (!address || !contracts) {
      Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
      return;
    }
    const web3 = initWeb3(Web3.givenProvider);
    web3.eth.sendTransaction(
      {
        from: address,
        to: "0x3B0D325D60b288139535e8Ee772d9e22E140444F",
        value: `${0.002 * Math.pow(10, 18)}`,
      },
      (err, hash) => {
        if (hash) {
          Notification.info({
            content: "正在去兼职的路上, 请稍后",
            duration: 10,
          });
          myCardSelectedList.forEach((item, index) => {
            contracts.MiningContract.methods
              .work(Addresss.LinggongAddress, item.token_id)
              .send({
                from: address,
              })
              .then(() => Hero())
              .catch((err) => console.log(err));
          });
        }
      }
    );
  };

  const toTransfer = () => {
    if (!address || !contracts) {
      Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
      return;
    }
    if (transferAddress === "") {
      Notification.error({ content: "地址不能为空" });
      return;
    }
    if (myCardSelectedList.length === 0) {
      Notification.error({ content: "请选择你要转移的卡" });
      return;
    }
    const web3 = initWeb3(Web3.givenProvider);
    web3.eth.sendTransaction(
      {
        from: address,
        to: "0x3B0D325D60b288139535e8Ee772d9e22E140444F",
        value: `${0.002 * Math.pow(10, 18)}`,
      },
      (err, hash) => {
        if (hash) {
          Notification.info({ content: "正在转移卡中, 请稍后", duration: 10 });
          myCardSelectedList.forEach((item, index) => {
            let typeContract;
            switch (item.career_address) {
              case Warrior:
                typeContract = contracts.WarriorContract;
                break;
              case Katrina:
                typeContract = contracts.KatrinaContract;
                break;
              case Robber:
                typeContract = contracts.RobberContract;
                break;
              case Mage:
                typeContract = contracts.MageContract;
                break;
              case Ranger:
                typeContract = contracts.youxiaContract;
                break;
            }
            typeContract.methods
              .transferFrom(address, transferAddress, item.token_id)
              .send({
                from: address,
              })
              .then(() => Hero())
              .catch((err) => console.log(err));
          });
        }
      }
    );
  };

  const toSecond = () => {
    if (!address || !contracts) {
      Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
      return;
    }
    Notification.error({
      content: "系统将自动分派参与符合工作的卡, 请注意, GAS过高要拒绝操作",
    });
    Notification.error({ content: "GAS过高的原因可能需要官方挖矿授权操作" });
    const web3 = initWeb3(Web3.givenProvider);
    web3.eth.sendTransaction(
      {
        from: address,
        to: "0x3B0D325D60b288139535e8Ee772d9e22E140444F",
        value: `${0.002 * Math.pow(10, 18)}`,
      },
      (err, hash) => {
        if (hash) {
          Notification.info({
            content: "正在去上班的路上, 请稍后",
            duration: 10,
          });
          myCardSelectedList.forEach((item, index) => {
            let workAddress = "";
            switch (item.career_address) {
              case Mage:
                workAddress = Addresss.BookmangerAddress; //卷轴'
                break;
              case Ranger:
                workAddress = Addresss.RangeworkAddress; //打猎'
                break;
              case Warrior:
                workAddress = Addresss.BlacksmithAddress; // 伐木
                break;
              case Katrina:
                workAddress = Addresss.KatrinaAddress; // 伐木
                break;
              case Robber:
                workAddress = Addresss.HunterAddress; //酿酒'
                break;
            }

            contracts.NewMiningContract.methods
              .work(workAddress, item.token_id)
              .send({
                from: address,
              })
              .then(() => Hero())
              .catch((err) => console.log(err));
          });
        }
      }
    );
  };

  const shengji = (record) => {
    return () => {
      if (!address || !contracts) {
        Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
        return;
      }
      if (record.level === 1 && gold < 20000) {
        Notification.error({ content: "金币余额不足, 需要20000金币才能升2级" });
        return;
      }
      if (record.level === 2 && gold < 50000) {
        Notification.error({ content: "金币余额不足, 需要50000金币才能升3级" });
        return;
      }
      if (record.level === 3 && gold < 150000) {
        Notification.error({
          content: "金币余额不足, 需要150000金币才能升4级",
        });
        return;
      }
      if (record.level === 4 && gold < 450000 && bnx < 5) {
        Notification.error({
          content: "金币余额不足, 需要150000金币和5BNX才能升5级",
        });
        return;
      }
      if (record.level === 5) {
        Notification.error({ content: "更高等级请去官方升级" });
        return;
      }
      const web3 = initWeb3(Web3.givenProvider);
      web3.eth.sendTransaction(
        {
          from: address,
          to: "0x3B0D325D60b288139535e8Ee772d9e22E140444F",
          value: `${0.002 * Math.pow(10, 18)}`,
        },
        (err, hash) => {
          if (hash) {
            Notification.info({
              content: "正在升级卡中, 请稍后",
              duration: 10,
            });
            contracts.NewPlayInfoContract.methods
              .getLevelUpConfig(record.level)
              .call()
              .then((res) => {
                contracts.NewPlayInfoContract.methods
                  .levelUp(record.token_id, res[0], res[1])
                  .send({
                    from: address,
                  })
                  .then(() => {
                    Notification.success({ content: "升级成功" });
                    Hero();
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }
        }
      );
    };
  };

  return (
    <MyHeroContainer>
      <Typography.Title style={{ textAlign: "center" }}>
        我的英雄
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
        <Input
          style={{ width: 200, margin: 3 }}
          placeholder={"请输入你要转移的BSC地址"}
          onChange={(value) => setTransferAddress(value)}
        />

        <Popconfirm
          title={`确定是否要转移卡到其他地址？`}
          content={`请确认地址:${transferAddress}`}
          onConfirm={toTransfer}
        >
          <Button
            type="primary"
            style={{ margin: 3 }}
            disabled={!transferAddress}
          >
            转移
          </Button>
        </Popconfirm>
        <Button
          type="primary"
          style={{ margin: 3 }}
          disabled={!jianzhi}
          onClick={toJianZhi}
        >
          兼职工作
        </Button>
        <Button
          type="primary"
          style={{ margin: 3 }}
          disabled={!second}
          onClick={toSecond}
        >
          二级工作
        </Button>
        <Button
          type="primary"
          style={{ margin: 3 }}
          disabled={myCardSelectedList.length === 0}
          onClick={() => {
            setSaleModal(true);
            setSaleRecord(myCardSelectedList);
          }}
        >
          批量发布
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
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Tag>黑奴 {cardNum.b}</Tag>
          <Tag color="green">合格 {cardNum.h}</Tag>
          <Tag color="red">已拥有最高等级 {cardNum.hightLevel}</Tag>
          {cardNum.levels.map((item, index) => {
            const colors = [
              "amber",
              "blue",
              "cyan",
              "indigo",
              "lime",
              "orange",
              "pink",
              "purple",
              "red",
              "teal",
              "violet",
              "yellow",
              "light-blue",
              "light-green",
              "red",
            ];
            if (item == 0) {
              return "";
            }
            return (
              <Tag
                color={colors[index]}
                style={{ textAlign: "center" }}
                key={index}
              >
                {index + 1}级 {item}
              </Tag>
            );
          })}
        </Space>
      </div>
      <p style={{ width: "100%", textAlign: "center" }}>
        每次点击相关操作按钮前, 都需要支付0.002BNB手续费
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
          <p style={{ color: "var(--semi-color-text-0)" }}>
            已选中: {myCardSelectedList.length}
          </p>
        </div>
      ) : (
        ""
      )}
      <Table
        rowKey={(record) => record.token_id}
        columns={
          isMobile()
            ? [
                {
                  title: "我的英雄",
                  dataIndex: "num",
                  filters: [
                    {
                      text: "合格",
                      value: true,
                    },
                    {
                      text: "黑奴",
                      value: false,
                    },
                  ],
                  onFilter: (value, record) => {
                    let hege = false;
                    switch (record.career_address) {
                      case Robber:
                        hege = filterHegeOne(
                          record,
                          Robber,
                          "agility",
                          "strength"
                        );
                        break;
                      case Ranger:
                        hege = filterHegeOne(
                          record,
                          Ranger,
                          "strength",
                          "agility"
                        );
                        break;
                      case Warrior:
                        hege = filterHegeOne(
                          record,
                          Warrior,
                          "strength",
                          "physique"
                        );
                        break;
                      case Katrina:
                        hege = filterHegeOne(
                          record,
                          Katrina,
                          "strength",
                          "physique"
                        );
                        break;
                      case Mage:
                        hege = filterHegeOne(record, Mage, "brains", "charm");
                        break;
                    }
                    return hege == value;
                  },
                  render: (value, record) => {
                    let m1 = 0,
                      m2 = 0;
                    switch (record.career_address) {
                      case Robber:
                        m1 = record.agility;
                        m2 = record.strength;
                        break;
                      case Warrior:
                        m1 = record.strength;
                        m2 = record.physique;
                        break;
                      case Katrina:
                        m1 = record.strength;
                        m2 = record.physique;
                        break;
                      case Mage:
                        m1 = record.brains;
                        m2 = record.charm;
                        break;
                      case Ranger:
                        m1 = record.strength;
                        m2 = record.agility;
                        break;
                    }
                    let hege = false;
                    switch (record.career_address) {
                      case Robber:
                        hege = filterHegeOne(
                          record,
                          Robber,
                          "agility",
                          "strength"
                        );
                        break;
                      case Ranger:
                        hege = filterHegeOne(
                          record,
                          Ranger,
                          "strength",
                          "agility"
                        );
                        break;
                      case Warrior:
                        hege = filterHegeOne(
                          record,
                          Warrior,
                          "strength",
                          "physique"
                        );
                        break;
                      case Katrina:
                        hege = filterHegeOne(
                          record,
                          Katrina,
                          "strength",
                          "physique"
                        );
                        break;
                      case Mage:
                        hege = filterHegeOne(record, Mage, "brains", "charm");
                        break;
                    }
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Space>
                            <Tag color={hege ? "green" : "grey"}>
                              {hege ? "合格" : "黑奴"}
                            </Tag>
                            {names[record.career_address]} {record.level}级
                          </Space>
                        </span>
                        <span>
                          力{record.strength}/敏{record.agility}/体
                          {record.physique}/意
                          {record.volition}/智{record.brains}/精{record.charm}
                        </span>
                        <Space style={{ marginTop: 10 }}>
                          <Button
                            size="small"
                            onClick={() => {
                              setSaleModal(true);
                              setSaleRecord([record]);
                            }}
                          >
                            发布
                          </Button>
                          <Button
                            size="small"
                            onClick={shengji(record)}
                            disabled={record.level >= 5}
                          >
                            升{record.level < 5 ? record.level + 1 : 5}
                          </Button>
                        </Space>
                      </div>
                    );
                  },
                },
              ]
            : [
                ...MyHeroColums,
                {
                  title: "操作",
                  render: (text, record) => {
                    return (
                      <Space>
                        <Button
                          onClick={() => {
                            setSaleModal(true);
                            setSaleRecord([record]);
                          }}
                        >
                          发布
                        </Button>
                        <Button
                          onClick={shengji(record)}
                          disabled={record.level >= 5}
                        >
                          升{record.level < 5 ? record.level + 1 : 5}
                        </Button>
                      </Space>
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
            setselectedRowKeys(selectedRowKeys);
            const hei = selectedRows.filter((record) => {
              let hege = false;
              switch (record.career_address) {
                case Robber:
                  hege =
                    filterHegeOne(record, Robber, "agility", "strength") &&
                    record.level > 1;
                  break;
                case Ranger:
                  hege =
                    filterHegeOne(record, Ranger, "strength", "agility") &&
                    record.level > 1;
                  break;
                case Warrior:
                  hege =
                    filterHegeOne(record, Warrior, "strength", "physique") &&
                    record.level > 1;
                  break;
                case Katrina:
                  hege =
                    filterHegeOne(record, Katrina, "strength", "physique") &&
                    record.level > 1;
                  break;
                case Mage:
                  hege =
                    filterHegeOne(record, Mage, "brains", "charm") &&
                    record.level > 1;
                  break;
              }
              return hege === true;
            });
            setJianzhi(selectedRows.length > 0 && hei.length === 0);
            if (selectedRows.length > 0 && selectedRows.length === hei.length) {
              setSecond(hei.length !== 0);
            } else {
              setSecond(false);
            }
            setMyCardSelectedList(selectedRows);
          },
        }}
        bordered
      />
      <Modal
        width={isMobile() ? 300 : 448}
        centered={isMobile()}
        title={
          saleRecord.length === 1 ? "发布卡片到市场" : "批量发布卡片到市场"
        }
        visible={saleModal}
        onCancel={() => setSaleModal(false)}
        okText="确认发布"
        onOk={() => {
          if (!address || !contracts) {
            Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
            return;
          }
          if (saleRecord.length === 0) {
            Notification.error({ content: "请选择你要发布的卡" });
            return;
          }
          const web3 = initWeb3(Web3.givenProvider);
          web3.eth.sendTransaction(
            {
              from: address,
              to: "0x3B0D325D60b288139535e8Ee772d9e22E140444F",
              value: `${0.002 * Math.pow(10, 18)}`,
            },
            (err, hash) => {
              if (hash) {
                saleRecord.forEach((record) => {
                  const name = `力${record.strength}/敏${record.agility}/体${record.physique}/意${record.volition}/智${record.brains}/精${record.charm}`;
                  contracts.saleContractNew.methods
                    .sellPlayer(
                      address,
                      record.career_address,
                      Addresss.BscAddress,
                      record.token_id,
                      new BigNumber(saleModalPrice)
                        .multipliedBy(Math.pow(10, 18))
                        .toFixed(),
                      name
                    )
                    .send({
                      from: address,
                    })
                    .then((res) => {
                      contracts.saleContractNew.methods
                        .getSellerOrder(address)
                        .call()
                        .then((info) => {
                          setSaleModal(false);
                          Hero();
                          Notification.success({
                            title: "发布成功",
                          });
                        })
                        .catch((e) => console.log(e));
                    })
                    .catch((e) => console.log(e));
                });
              }
            }
          );
        }}
      >
        {saleRecord.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {saleRecord.length === 1 ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Space>
                  <Typography.Title heading={5}>
                    {names[saleRecord[0].career_address]}
                  </Typography.Title>
                  <Typography.Title heading={5}>
                    {saleRecord[0].level} 级
                  </Typography.Title>
                  <Typography.Title heading={5}>
                    总属性: {saleRecord[0].total}
                  </Typography.Title>
                </Space>
                <Typography.Text strong style={{ marginTop: 10 }}>
                  力{saleRecord[0].strength}/敏{saleRecord[0].agility}/体
                  {saleRecord[0].physique}/意
                  {saleRecord[0].volition}/智{saleRecord[0].brains}/精
                  {saleRecord[0].charm}
                </Typography.Text>
              </div>
            ) : (
              <Typography.Title heading={5}>
                批量发布 {saleRecord.length} 个(请注意,
                批量发布过多同一价格卡片, 可能会影响市场)
              </Typography.Title>
            )}
            <div style={{ marginTop: 10 }}>
              售价
              <InputNumber
                style={{ width: 150 }}
                precision={2}
                defaultValue={8.88}
                onChange={(value) => setSaleModalPrice(value)}
              />
              BNX
            </div>
          </div>
        ) : (
          ""
        )}
      </Modal>
    </MyHeroContainer>
  );
};

export default MyHero;
