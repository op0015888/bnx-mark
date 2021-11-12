import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Space,
  Notification,
  Modal,
  Typography,
  Spin,
  Select,
} from "@douyinfe/semi-ui";
import Web3 from "web3";
import { isMobile, initWeb3, ff } from "../utils/util";
import NowAddress from "../components/NowAddress";
import { Addresss } from "../utils/emuns";

const MyHeroContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
`;

const BaoXiang = ({ address, contracts }) => {
  const [myCardSelectedList, setMyCardSelectedList] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [bnx, setBnx] = useState(0);
  const [Inkey, setInKey] = useState(0);
  const [gold, setGold] = useState(0);
  const [fubenList, setFubenlist] = useState([]);
  const [nlogs, setNlogs] = useState([]);
  const [mxlist, setMxList] = useState([]);
  const [mxxlist, setMxxList] = useState([]);
  const [feeTypeGOLD, setfeeTypeGOLD] = useState(302);
  const [feeTypeIronKey, setfeeTypeIronKey] = useState(301);
  const [feeConfigIronKey, setfeeConfigIronKey] = useState([]);
  const [feeConfigGOLD, setfeeConfigGOLD] = useState([]);

  useEffect(() => {
    setNlogs([]);
    setselectedRowKeys([]);
    setMyCardSelectedList([]);
    getFubenlist();
    getLoglist();
    getConfig();
    getBnxGold();
  }, [address]);

  const getConfig = async () => {
    if (!address || !contracts) {
      Notification.info({ content: "请刷新网页" });
      return;
    }
    const feeConfigIronKey = await contracts.feeContract.methods
      .getFeeConfig(feeTypeIronKey)
      .call();
    const feeConfigGOLD = await contracts.feeContract.methods
      .getFeeConfig(feeTypeGOLD)
      .call();
    // console.log(feeConfigIronKey, feeConfigGOLD)
    setfeeConfigIronKey(feeConfigIronKey);
    setfeeConfigGOLD(feeConfigGOLD);
  };

  // 副本列表
  const getFubenlist = () => {
    if (!address) return;
    fetch(
      `https://game.binaryx.pro//v1/chest/list?Page=1&Limit=30&lang=zh-cn&GoldAddress=${address}`,
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setFubenlist(res.data.Lists);
      })
      .catch((err) => console.log(err));
  };

  // 开箱记录
  const getLoglist = () => {
    if (!address) return;
    fetch(
      `https://game.binaryx.pro//v1/chest/loglist?Page=1&Limit=9999&lang=zh-cn&GoldAddress=${address}`,
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        const list = res.data.Lists;
        const nl = list.map((item) => {
          return {
            reward_money: item.r_money,
            reward_coupon: item.r_coupon,
            reward_coin: item.r_coin,
            reward_eqs: item.r_eqs,
            lt: item.clt,
          };
        });
        setNlogs(nl);
      })
      .catch((err) => console.log(err));
  };

  const getBnxGold = () => {
    if (!address || !contracts) {
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

  const mx1 = (bid) => {
    fetch(
      `https://game.binaryx.pro/v1/user/getaddressnonce?GoldAddress=${address}`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          GoldAddress: address,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        const { code, data } = res;
        if (code === 1) {
          const { nonce } = data;
          const web3 = initWeb3(Web3.givenProvider);
          web3.eth.personal
            .sign(web3.utils.utf8ToHex(nonce + ""), address, "password")
            .then((e) => {
              // console.log(e);
              fetch(
                `https://game.binaryx.pro/v1/chest/begin?Id=${bid}&CardNumber=0&GoldAddress=${address}&ASign=${e}&Nonce=${nonce}`,
                {
                  method: "POST",
                  credentials: "include",
                  body: JSON.stringify({
                    GoldAddress: address,
                    Id: bid,
                    ASign: e,
                    Nonce: nonce,
                    CardNumber: "0",
                  }),
                }
              )
                .then((res) => res.json())
                .then((res) => {
                  const { code, data } = res;
                  // console.log(res);
                  if (code === 1) {
                    const { uuid, id } = data;
                    if (id == 2) {
                    }
                    contracts.feeContract.methods
                      .paymentCoin(
                        nonce,
                        id == 2
                          ? Addresss.IronKeyAddress
                          : Addresss.NewtokenAddress,
                        id == 2 ? feeTypeIronKey : feeTypeGOLD,
                        id == 2 ? feeConfigIronKey[0] : feeConfigGOLD[0]
                      )
                      .send({
                        from: address,
                      })
                      .then((e) => {
                        Notification.info({ content: "检查门票是否到账" });
                        mx2(uuid, id, bid);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                });
            })
            .catch((e) => console.log(e));
        } else {
          setTimeout(() => {
            mx1(bid);
          }, 3000);
        }
      });
  };

  const mx2 = (Uuid, DataId, id) => {
    fetch(
      `https://game.binaryx.pro/v1/chest/checkpay?GoldAddress=${address}&Uuid=${Uuid}&DataId=${DataId}`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          GoldAddress: address,
          Uuid: Uuid,
          DataId: DataId,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        res.data && 0 !== res.data.ps
          ? setTimeout(function () {
              Notification.info({ content: "正在开箱中" });
              mx3(DataId, id);
            }, 2000)
          : setTimeout(function () {
              mx2(Uuid, DataId, id);
            }, 3000);
      });
  };

  const mx3 = (DataId, id) => {
    fetch(
      `https://game.binaryx.pro/v1/chest/open?GoldAddress=${address}&DataId=${DataId}&id=${id}&CardNumber=0`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          GoldAddress: address,
          DataId: DataId,
          id: id,
          CardNumber: "0",
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 1) {
          const { reward_money, reward_coupon, reward_coin, reward_eqs, lt } =
            res.data;
          const log = {
            reward_money,
            reward_coupon,
            reward_coin,
            reward_eqs,
            lt,
          };
          // console.log(log);
          nlogs.push(log);
          setNlogs(nlogs);
          Notification.success({
            content: `收益: 金币:${reward_money} 钥匙${reward_coupon} BNX${reward_coin} 装备${
              reward_eqs == null
                ? ""
                : reward_eqs.map((item) => item.name).toString()
            } `,
          });
        }
        if (nlogs.length === 10) {
          Notification.success({ content: "已完成" });
          getFubenlist();
          getConfig();
        }
      });
  };

  return (
    <MyHeroContainer>
      <Typography.Title style={{ textAlign: "center" }}>
        开宝箱
      </Typography.Title>
      <NowAddress address={address} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 5,
        }}
      >
        <a href="https://game.binaryx.pro/#/game?type=5" target="_blank">
          BinaryX官网
        </a>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          flexWrap: "wrap",
        }}
      >
        <Space>
          <Tag color="red">BNX {bnx}</Tag>
          <Tag color="yellow">金币 {gold}</Tag>
          <Tag color="orange">钥匙 {Inkey}</Tag>
        </Space>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          flexWrap: "wrap",
        }}
      >
        {fubenList.map((item, index) => {
          return (
            <div
              key={item.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                type="primary"
                disabled={item.status === 0}
                style={{ margin: 3 }}
                onClick={() => {
                  getBnxGold(address);
                  if (
                    item.name === "白银宝箱" &&
                    gold < (Number(feeConfigGOLD[0]) / Math.pow(10, 18)) * 10
                  ) {
                    Notification.error({ content: "金币不足" });
                    return;
                  }
                  if (
                    item.name === "黑铁宝箱" &&
                    Inkey <
                      (Number(feeConfigIronKey[0]) / Math.pow(10, 18)) * 10
                  ) {
                    Notification.error({ content: "钥匙不足" });
                    return;
                  }
                  ff(0.002, () => {
                    for (let i = 0; i < 10; i++) {
                      setTimeout(() => {
                        mx1(item.id);
                      }, 15000);
                    }
                  });
                }}
              >
                {item.name === "黑铁宝箱"
                  ? `十连抽${item.name}[${
                      (Number(feeConfigIronKey[0]) / Math.pow(10, 18)) * 10
                    }钥匙]`
                  : item.name === "白银宝箱"
                  ? `十连抽${item.name}[${
                      (Number(feeConfigGOLD[0]) / Math.pow(10, 18)) * 10
                    }金币]`
                  : item.name}
              </Button>
              <span style={{color: item.bonus_pool == 0 ? 'transparent' : 'black'}}>奖池: {item.bonus_pool == 0 ? "" : item.bonus_pool}</span>
            </div>
          );
        })}
      </div>
      <p style={{ width: "100%", textAlign: "center" }}>
        每次点击开宝箱按钮前, 都需要支付一笔0.002BNB手续费
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
        columns={[
          {
            title: "金币",
            dataIndex: "reward_money",
            render: (text) => {
              return <span>{Number(text).toFixed(4)}</span>;
            },
          },
          {
            title: "BNX",
            dataIndex: "reward_coin",
            render: (text) => {
              return <span>{Number(text).toFixed(4)}</span>;
            },
          },
          {
            title: "钥匙",
            dataIndex: "reward_coupon",
          },
          {
            title: "装备",
            dataIndex: "reward_eqs",
            render: (text, record) => {
              return (
                <span>
                  {record.reward_eqs == null
                    ? ""
                    : record.reward_eqs.map((item) => item.name).toString()}
                </span>
              );
            },
          },
          {
            title: "剩余次数",
            dataIndex: "lt",
          },
        ]}
        dataSource={nlogs}
        pagination={{
          formatPageText: !isMobile(),
        }}
        bordered
      />
    </MyHeroContainer>
  );
};

export default BaoXiang;
