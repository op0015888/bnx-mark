import styled from "styled-components";
import { Table, Button, Typography, Notification } from "@douyinfe/semi-ui";
import { LowPriceColums, LowPriceMColums } from "../utils/colums";
import { isMobile } from "../utils/util";
import markJson from "../assets/marks.json";
import { useEffect, useState } from "react";
import { Robber, Warrior, Ranger, Katrina, Mage } from "../utils/emuns";
const LowPriceContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
`;

const LowPrice = () => {
  const [lowPrices, setLowPrices] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => getLowPrices(), []);

  const getLowPrices = () => {
    setLoad(true);
    const allList = markJson.data.result.items;
    const attrs = [86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
    const lowPrices = attrs.map((attr) => {
      const s = [
        ...filterHege(allList, Robber, "agility", "strength", attr),
        ...filterHege(allList, Ranger, "strength", "agility", attr),
        ...filterHege(allList, Warrior, "strength", "physique", attr),
        ...filterHege(allList, Katrina, "strength", "physique", attr),
        ...filterHege(allList, Mage, "brains", "charm", attr),
      ]
        .filter((item) => {
          return (
            item.agility === attr ||
            item.strength === attr ||
            item.brains === attr ||
            item.physique === attr
          );
        })
        .sort((a, b) => parseInt(a.price) - parseInt(b.price))[0];
      return s;
    });
    setLowPrices(lowPrices);
    setLoad(false);
    Notification.success({ content: "已刷新数据" });
  };

  const filterHege = (
    items,
    address,
    attr1,
    atrr2,
    mainAttr1 = 86,
    seconed = 61
  ) => {
    return (items = items.filter((item) => {
      return (
        item.career_address === address &&
        item[attr1] >= mainAttr1 &&
        item[atrr2] >= seconed &&
        item.level === 1
      );
    }));
  };
  return (
    <LowPriceContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 20,
          flexWrap: "wrap",
        }}
      >
        <Typography.Title heading={2}>合格卡地板价</Typography.Title>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 5,
          }}
        >
          <a href="https://market.binaryx.pro/#/oneoffsale" target="_blank">
            BinaryX市场官网
          </a>
        </div>
        <Button type="primary" style={{ margin: 3 }} onClick={getLowPrices}>
          刷新
        </Button>
      </div>
      <Table
        loading={load}
        columns={isMobile() ? LowPriceMColums : LowPriceColums}
        dataSource={lowPrices}
        pagination={{ pageSize: 20 }}
        size="small"
        bordered
      />
    </LowPriceContainer>
  );
};

export default LowPrice;
