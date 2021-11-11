export const Robber = "0xaF9A274c9668d68322B0dcD9043D79Cd1eBd41b3";
export const Warrior = "0x22F3E436dF132791140571FC985Eb17Ab1846494";
export const Katrina = "0x819E04ddE93600b224F65e3C9B51b1B4D9fBa3b5";
export const Mage = "0xC6dB06fF6e97a6Dc4304f7615CdD392a9cF13F44";
export const Ranger = "0xF31913a9C8EFE7cE7F08A1c08757C166b572a937";
export const gongzuo_type1 = `0xfA65a5751ef6079C1022Aa10b9163d7A2281360A`; //兼职工作
export const gongzuo_type2 = `0x480d503B12ae928e8DcCd820CE45B2f6F39Ad598`; //酿酒
export const gongzuo_type3 = `0x3a4D27B77B253bdb9AFec082D8f5cDE5A4D713E1`; //伐木
export const gongzuo_type4 = `0x21D4Da5833d93944B8340788C6b463ED8420838B`; //卷轴抄录
export const gongzuo_type5 = `0x81E9aCe9511A7d56fd31940d1C49425CA3a2B8f8`; //打猎
export const gongzuo_type6 = `0xC5dDbb4ac27A939D914059A023C6A35F377B67Ff`; //皇室守卫
export const gongzuo_type7 = `0xdcC5C1e7A3ADC8b7635565183a7385026502440B`; //军团士兵
export const gongzuo_type8 = `0x0ac4eB7978E0dA0d53824bd590354C8Bd264C4e6`; //皇室顾问

export const gongzuo_type_zh = (type) => {
  switch (type) {
    case gongzuo_type1:
      return "兼职";
    case gongzuo_type2:
      return "酿酒";
    case gongzuo_type3:
      return "伐木";
    case gongzuo_type4:
      return "卷轴";
    case gongzuo_type5:
      return "打猎";
    case gongzuo_type6:
      return "守卫";
    case gongzuo_type7:
      return "士兵";
    case gongzuo_type8:
      return "顾问";
    default:
      return "兼职";
  }
};

export const prices = {
  86: 423,
  87: 576,
  88: 720,
  89: 864,
  90: 1008,
  91: 1152,
  92: 1296,
  93: 1440,
  94: 1584,
  95: 1728,
  96: 1872,
  97: 2016,
  98: 2160,
  99: 2304,
  100: 2448,
};

export const multiples = {
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16,
  6: 25,
  7: 50,
  8: 75,
  9: 100,
  10: 200,
  11: 300,
  12: 500,
};

export const Addresss = {
  WarriorAddress: "0x22F3E436dF132791140571FC985Eb17Ab1846494",
  RobberAddress: "0xaF9A274c9668d68322B0dcD9043D79Cd1eBd41b3",
  MageAddress: "0xC6dB06fF6e97a6Dc4304f7615CdD392a9cF13F44",
  YXAddress: "0xF31913a9C8EFE7cE7F08A1c08757C166b572a937",
  KatrinaAddress: "0x819E04ddE93600b224F65e3C9B51b1B4D9fBa3b5",
  NewPlayInfoAddress: "0x79961F74D1E53CA480e4dDf5675D5A6D7B1852e7",
  MiningAddress: "0xe278BDF4541cc309b379F9A4E867F60fD6B7BC59",
  NewMiningAddress: "0x698E165F2897e4daC68671c4cDFf337bbC543767",
  BulieAddress: "0x8B2DF673a3313BB3c0A03A154D9fFECbB2cCF26F",
  DatieAddress: "0x4713A70db9AD47780EFC3300c08C17c4013DCa57",
  LinggongAddress: "0xfA65a5751ef6079C1022Aa10b9163d7A2281360A",
  TushuAddress: "0x0594522127B6276C001554C15b900166BD98eC0E",
  BlacksmithAddress: "0x3a4D27B77B253bdb9AFec082D8f5cDE5A4D713E1",
  HunterAddress: "0x480d503B12ae928e8DcCd820CE45B2f6F39Ad598",
  BookmangerAddress: "0x21D4Da5833d93944B8340788C6b463ED8420838B",
  RangeworkAddress: "0x81E9aCe9511A7d56fd31940d1C49425CA3a2B8f8",
  newSaleAddress: "0x1416e6EA40CBb1F09Cd2dbEdAAd6fbFE3e38D51F",
  saleAddress: "0xD52039A262DeED2466beFA8dEe15e5d72c2DFAdF",
  NewtokenAddress: "0xb3a6381070B1a15169DEA646166EC0699fDAeA79",
  BscAddress: "0x8C851d1a123Ff703BD1f9dabe631b69902Df5f97",
  IronKeyAddress: "0x72B587C50A3899dce4B25A95b2994C417830C603",
  gameManager: "0xA100C0f774Ed525C186e6BeCDa88812427e1742d",
  FeeAddress: '0x092092Ec06C5D06775249c689AaD880336dD5c8e',
  // 手腕
  amzAddress: "0x3d7b0001e03096d3795Fd5D984AD679467546d73",
  tokenAddress: "0xd3c9609B6CBC6eF02390F33C230590c38F9E5f9D",
  poolAddress: "0xe4dd4794C915CB99f5A12cA8058d8B45fFEa8545",
  fightAddress: "0x65261f17743fd5fE74c69d03147A1F21F7658db6"
};
export const names = {
    [Robber]: "盗贼",
    [Warrior]: "战士",
    [Mage]: "法师",
    [Ranger]: "游侠",
    [Katrina]: "卡特",
  };