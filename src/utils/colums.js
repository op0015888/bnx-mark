import {
  names,
  Robber,
  Warrior,
  Ranger,
  Katrina,
  Mage,
  Addresss,
  gongzuo_type1,
  gongzuo_type2,
  gongzuo_type3,
  gongzuo_type4,
  gongzuo_type5,
  gongzuo_type6,
  gongzuo_type7,
  gongzuo_type8,
  gongzuo_type9,
} from "./emuns";

import { Typography, Space, Tag } from "@douyinfe/semi-ui";
import { filterHegeOne, isMobile } from "./util";

export const HegeColumn = [
  {
    title: "",
    dataIndex: "hege",
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
          hege = filterHegeOne(record, Robber, "agility", "strength");
          break;
        case Ranger:
          hege = filterHegeOne(record, Ranger, "strength", "agility");
          break;
        case Warrior:
          hege = filterHegeOne(record, Warrior, "strength", "physique");
          break;
        case Katrina:
          hege = filterHegeOne(record, Katrina, "strength", "physique");
          break;
        case Mage:
          hege = filterHegeOne(record, Mage, "brains", "charm");
          break;
      }
      return hege == value;
    },
    render: (text, record) => {
      let hege = false;
      switch (record.career_address) {
        case Robber:
          hege = filterHegeOne(record, Robber, "agility", "strength");
          break;
        case Ranger:
          hege = filterHegeOne(record, Ranger, "strength", "agility");
          break;
        case Warrior:
          hege = filterHegeOne(record, Warrior, "strength", "physique");
          break;
        case Katrina:
          hege = filterHegeOne(record, Katrina, "strength", "physique");
          break;
        case Mage:
          hege = filterHegeOne(record, Mage, "brains", "charm");
          break;
      }
      return (
        <>
          <Tag color={hege ? "green" : "grey"}>
            {hege ? (isMobile() ? "合" : "合格") : isMobile() ? "黑" : "黑奴"}
          </Tag>
        </>
      );
    },
  },
];

export const TokenColumn = [
  {
    title: "TokenId",
    dataIndex: "token_id",
    width: 200,
    render: (text, record) => {
      return (
        <Typography.Text ellipsis={{pos: 'middle'}} copyable style={{ display: "flex", alignItems: "center" }}>
          {text}
        </Typography.Text>
      );
    },
  },
];
export const BaseColums = [
  {
    title: "名称",
    dataIndex: "name",
    sorter: (a, b) => a.career_address - b.career_address,
    render: (text, record) => {
      return <span>{names[record.career_address]}</span>;
    },
    filters: [
      {
        text: names[Warrior],
        value: Warrior,
      },
      {
        text: names[Ranger],
        value: Ranger,
      },
      {
        text: names[Robber],
        value: Robber,
      },
      {
        text: names[Mage],
        value: Mage,
      },
      {
        text: names[Katrina],
        value: Katrina,
      },
    ],
    onFilter: (value, record) => record.career_address.includes(value),
  },
  {
    title: "等级",
    dataIndex: "level",
    sorter: (a, b) => a.level - b.level,
  },
  {
    title: "总属性",
    dataIndex: "total",
    sorter: (a, b) => a.total - b.total,
  },
  {
    title: "力量",
    dataIndex: "strength",
    sorter: (a, b) => a.strength - b.strength,
    render: (text, record) => {
      return (
        <span
          style={{
            color:
              record.career_address === Robber ||
              record.career_address === Warrior ||
              record.career_address === Ranger ||
              record.career_address === Katrina
                ? "red"
                : "var(--semi-color-text-0)",
          }}
        >
          {record.strength}
          {record.career_address === Warrior ||
          record.career_address === Ranger ||
          record.career_address === Katrina
            ? "(主)"
            : ""}
          {record.career_address === Robber ? "(副)" : ""}
        </span>
      );
    },
  },
  {
    title: "敏捷",
    dataIndex: "agility",
    sorter: (a, b) => a.agility - b.agility,
    render: (text, record) => {
      return (
        <span
          style={{
            color:
              record.career_address === Robber ||
              record.career_address === Ranger
                ? "red"
                : "var(--semi-color-text-0)",
          }}
        >
          {record.agility}
          {record.career_address === Robber ? "(主)" : ""}
          {record.career_address === Ranger ? "(副)" : ""}
        </span>
      );
    },
  },
  {
    title: "体质",
    dataIndex: "physique",
    sorter: (a, b) => a.physique - b.physique,
    render: (text, record) => {
      return (
        <span
          style={{
            color:
              record.career_address === Warrior ||
              record.career_address === Katrina
                ? "red"
                : "var(--semi-color-text-0)",
          }}
        >
          {record.physique}
          {record.career_address === Warrior ||
          record.career_address === Katrina
            ? "(副)"
            : ""}
        </span>
      );
    },
  },
  {
    title: "意志",
    dataIndex: "volition",
    sorter: (a, b) => a.volition - b.volition,
  },
  {
    title: "智力",
    dataIndex: "brains",
    sorter: (a, b) => a.brains - b.brains,
    render: (text, record) => {
      return (
        <span
          style={{ color: record.career_address === Mage ? "red" : "var(--semi-color-text-0)" }}
        >
          {record.brains}
          {record.career_address === Mage ? "(主)" : ""}
        </span>
      );
    },
  },
  {
    title: "精神",
    dataIndex: "charm",
    sorter: (a, b) => a.charm - b.charm,
    render: (text, record) => {
      return (
        <span
          style={{ color: record.career_address === Mage ? "red" : "var(--semi-color-text-0)" }}
        >
          {record.charm}
          {record.career_address === Mage ? "(副)" : ""}
        </span>
      );
    },
  },
];

export const BaseMColums = [
  {
    title: "名",
    dataIndex: "name",
    render: (text, record) => {
      return <span>{names[record.career_address]}</span>;
    },
  },
  {
    title: "级",
    dataIndex: "level",
  },
  {
    title: "总",
    dataIndex: "total",
  },
  {
    title: "主",
    dataIndex: "m1",
    render: (text, record) => {
      let value = 0;
      switch (record.career_address) {
        case Robber:
          value = record.agility;
          break;
        case Warrior:
          value = record.strength;
          break;
        case Katrina:
          value = record.strength;
          break;
        case Mage:
          value = record.brains;
          break;
        case Ranger:
          value = record.strength;
          break;
      }
      return <p>{value}</p>;
    },
  },
  {
    title: "副",
    dataIndex: "m2",
    render: (text, record) => {
      let value = 0;
      switch (record.career_address) {
        case Robber:
          value = record.strength;
          break;
        case Warrior:
          value = record.physique;
          break;
        case Katrina:
          value = record.physique;
          break;
        case Mage:
          value = record.charm;
          break;
        case Ranger:
          value = record.agility;
          break;
      }
      return <p>{value}</p>;
    },
  },
];
export const MyHeroColums = [
  ...TokenColumn,
  ...HegeColumn,
  ...BaseColums,
];

export const MyHeroMColums = [
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
          hege = filterHegeOne(record, Robber, "agility", "strength");
          break;
        case Ranger:
          hege = filterHegeOne(record, Ranger, "strength", "agility");
          break;
        case Warrior:
          hege = filterHegeOne(record, Warrior, "strength", "physique");
          break;
        case Katrina:
          hege = filterHegeOne(record, Katrina, "strength", "physique");
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
          hege = filterHegeOne(record, Robber, "agility", "strength");
          break;
        case Ranger:
          hege = filterHegeOne(record, Ranger, "strength", "agility");
          break;
        case Warrior:
          hege = filterHegeOne(record, Warrior, "strength", "physique");
          break;
        case Katrina:
          hege = filterHegeOne(record, Katrina, "strength", "physique");
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
              <Tag color={hege ? "green" : "grey"}>{hege ? "合格" : "黑奴"}</Tag>
              {names[record.career_address]} {record.level}级
            </Space>
          </span>
          <span>
            力{record.strength}/敏{record.agility}/体{record.physique}/意
            {record.volition}/智{record.brains}/精{record.charm}
          </span>
          <span>
            <Tag color="orange">剩余冒险次数: {record.num}</Tag>{" "}
          </span>
        </div>
      );
    },
  },
];

export const GoldColums = [
  ...TokenColumn,
  ...HegeColumn,
  ...BaseColums,
  {
    title: "工作",
    dataIndex: "workname",
    sorter: (a, b) => a.work_type - b.work_type,
    render: (text, record) => {
      let url = "https://game.binaryx.pro/#/game/work?workType=partTime"
      switch(record.work_type) {
        case gongzuo_type1: url = "https://game.binaryx.pro/#/game/work?workType=partTime"; return;
        case gongzuo_type2: url = "https://game.binaryx.pro/#/game/work?workType=Winemaker"; return;
        case gongzuo_type3: url = "https://game.binaryx.pro/#/game/work?workType=strike"; return;
        case gongzuo_type4: url = "https://game.binaryx.pro/#/game/work?workType=library"; return;
        case gongzuo_type5: url = "https://game.binaryx.pro/#/game/work?workType=hunting"; return;
        case gongzuo_type6: url = "https://game.binaryx.pro/#/game/work?workType=senior&work=5"; return;
        case gongzuo_type7: url = "https://game.binaryx.pro/#/game/work?workType=sixth&work=6"; return;
        case gongzuo_type8: url = "https://game.binaryx.pro/#/game/work?workType=seventh&work=7"; return;
        case gongzuo_type9: url = "https://game.binaryx.pro/#/game/work?workType=Legendary"; return;
      }
      return <a href={url} target='_blank'>{text}</a>
    }
  },
  {
    title: "收益",
    dataIndex: "gold",
    sorter: (a, b) => a.gold - b.gold,
  },
];

export const GoldMColums = [
  {
    title: "挖矿收益",
    dataIndex: "gold",
    sorter: (a, b) => a.gold - b.gold,
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
          hege = filterHegeOne(record, Robber, "agility", "strength");
          break;
        case Ranger:
          hege = filterHegeOne(record, Ranger, "strength", "agility");
          break;
        case Warrior:
          hege = filterHegeOne(record, Warrior, "strength", "physique");
          break;
        case Katrina:
          hege = filterHegeOne(record, Katrina, "strength", "physique");
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
          hege = filterHegeOne(record, Robber, "agility", "strength");
          break;
        case Ranger:
          hege = filterHegeOne(record, Ranger, "strength", "agility");
          break;
        case Warrior:
          hege = filterHegeOne(record, Warrior, "strength", "physique");
          break;
        case Katrina:
          hege = filterHegeOne(record, Katrina, "strength", "physique");
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
              <Tag color={hege ? "green" : "grey"}>{hege ? "合格" : "黑奴"}</Tag>
              {names[record.career_address]} {record.level}级
            </Space>
          </span>
          <span>
            力{record.strength}/敏{record.agility}/体{record.physique}/意
            {record.volition}/智{record.brains}/精{record.charm}
          </span>
          <span>
            <Tag color="orange">工作类型: {record.workname}</Tag>{" "}
            <Tag color="yellow">收益: {record.gold}</Tag>
          </span>
        </div>
      );
    },
  },
];

export const LowPriceColums = [
  ...TokenColumn,
  ...BaseColums,
  {
    title: "价格",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
    render: (text, record) => {
      return (
        <p>
          {(Number(record.price) / Math.pow(10, 18)).toFixed(2)}
          {record.pay_addr === Addresss.BscAddress ? "BNX" : "Gold"}
        </p>
      );
    },
  },
];

export const LowPriceMColums = [
  ...BaseMColums,
  {
    title: "价",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
    render: (text, record) => {
      return (
        <p>
          {(Number(record.price) / Math.pow(10, 18)).toFixed(2)}
          {record.pay_addr === Addresss.BscAddress ? "B" : "G"}
        </p>
      );
    },
  },
];

export const CardMColums = [
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
          hege = filterHegeOne(record, Robber, "agility", "strength");
          break;
        case Ranger:
          hege = filterHegeOne(record, Ranger, "strength", "agility");
          break;
        case Warrior:
          hege = filterHegeOne(record, Warrior, "strength", "physique");
          break;
        case Katrina:
          hege = filterHegeOne(record, Katrina, "strength", "physique");
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
          hege = filterHegeOne(record, Robber, "agility", "strength");
          break;
        case Ranger:
          hege = filterHegeOne(record, Ranger, "strength", "agility");
          break;
        case Warrior:
          hege = filterHegeOne(record, Warrior, "strength", "physique");
          break;
        case Katrina:
          hege = filterHegeOne(record, Katrina, "strength", "physique");
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
              <Tag color={hege ? "green" : "grey"}>{hege ? "合格" : "黑奴"}</Tag>
              {names[record.career_address]} {record.level}级
            </Space>
          </span>
          <span>
            力{record.strength}/敏{record.agility}/体{record.physique}/意
            {record.volition}/智{record.brains}/精{record.charm}
          </span>
        </div>
      );
    },
  },
];
