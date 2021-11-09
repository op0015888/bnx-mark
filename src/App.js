import Head from "./components/Head";
import { Layout, BackTop, Banner } from "@douyinfe/semi-ui";
import MyHero from "./pages/MyHero";
import Gold from "./pages/Gold";
import { useMetamask } from "use-metamask";
import Web3 from "web3";
import { Routes, Route } from "react-router-dom";
import LowPrice from "./pages/LowPrice";
import { useEffect, useState } from "react";
import { Addresss } from "./utils/emuns";
import { BigNumber } from "bignumber.js";

import hreoAbi from "./abis/hreoabi.json";
import mingAbi from "./abis/mingAbi.json";
import newmingAbi from "./abis/newmingAbi.json";
import LinggongAbi from "./abis/LinggongAbi.json";
import newPlayAbi from "./abis/newPlayAbi.json";
import BlacksmithAbi from "./abis/BlacksmithAbi.json";
import HunterAbi from "./abis/HunterAbi.json";
import BookmangerAbi from "./abis/BookmangerAbi.json";
import RangeworkAbi from "./abis/RangeworkAbi.json";
import gameAbi from "./abis/game.json";
import saleAbi from "./abis/saleAbi.json";
import newsaleAbi from "./abis/newsaleAbi.json";
import goldAbi from "./abis/gold.json";
import bnxAbi from "./abis/bnx.json";
import vipAbi from "./abis/vip.json";
import { initWeb3 } from "./utils/util";
import MaoXian from "./pages/MaoXian";
import NewCard from "./pages/NewCard";

import zh_CN from "@douyinfe/semi-ui/lib/es/locale/source/zh_CN";
import en_US from "@douyinfe/semi-ui/lib/es/locale/source/en_US";
import { LocaleProvider } from "@douyinfe/semi-ui";
import cookie from "react-cookies";
import NowAddress from "./components/NowAddress";

zh_CN["ToolCat"] = {
  AppTitle: "工具猫",
  dark: "暗色模式",
  light: "亮色模式",
  Language: "EN",
  Menu: {
    chouka: "抽卡",
    hero: "我的英雄",
    wankuang: "日常挖矿",
    maoxian: "冒险",
    dibanjia: "地板价",
  },
  nowaddress: "当前地址",
  card: {
    title: "抽卡暴富",
    onecard: "单抽",
    fivecard: "五连抽",
    tencard: "十连抽",
  },
};

en_US["ToolCat"] = {
  AppTitle: "ToolCat",
  dark: "Dark Mode",
  light: "Light Mode",
  Language: "中文",
  Menu: {
    chouka: "New Crad",
    hero: "My Hero",
    wankuang: "Daily Dig",
    maoxian: "Adventure",
    dibanjia: "Price Floor",
  },
  nowaddress: "Address",
  card: {
    title: "Card Rich",
    onecard: "Single",
    fivecard: "5 Smoke",
    tencard: "10 Smoke",
  },
};

const { Content } = Layout;

const network_chainId = 56;
const chain = {
  chainId: "0x38",
  chainName: "BSC",
  nativeCurrency: {
    name: "BSC",
    symbol: "BSC",
    decimals: 18,
  },
  rpcUrls: ["https://bsc-dataseed3.binance.org"],
  blockExplorerUrls: ["https://bscscan.com/"],
};

const App = () => {
  const { connect, metaState } = useMetamask();
  const provider = window.ethereum;
  const AppLanguages = { zh_CN, en_US };
  const [locale, setLocale] = useState(
    AppLanguages[cookie.load("lang") || "zh_CN"]
  );
  const [address, setAddress] = useState("");
  const [contracts, setContracts] = useState({});
  const [contractss, setContractss] = useState(0);
  useEffect(() => {
    onConnnect();
    initContract();
  }, []);

  const toogleLanguage = (type) => {
    return () => {
      setLocale(AppLanguages[type || "zh_CN"]);
      cookie.save("lang", "zh_CN");
    };
  };

  const onConnnect = async () => {
    provider
      .request({
        method: "wallet_addEthereumChain",
        params: [chain],
      })
      .catch((error) => {
        console.log(error);
      });
    if (metaState.isAvailable && !metaState.isConnected) {
      try {
        await connect(Web3);
        const web3 = initWeb3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          const addr = accounts[0];
          setAddress(addr);
          // contracts.VipContract.methods
          //   .addVIP(
          //     1638331932,
          //     '10000000000000000000'
          //   )
          //   .send({ from: addr })
          //   // .call()
          //   .then((res) => console.log(res)).catch(err => console.log(err));
          // contracts.VipContract.methods.VIPS(addr).call().
          // then(res => setContractss(res)).catch(e => console.log(e))
        }
        MetaMaskEvent();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const MetaMaskEvent = () => {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        const addr = accounts[0];
        setAddress(addr);
      }
    });
    window.ethereum.on("chainChanged", (chainId) => {
      if (chainId !== chain.chainId) {
      }
    });
  };

  const initContract = () => {
    const web3 = initWeb3(Web3.givenProvider);
    contracts.VipContract = new web3.eth.Contract(
      vipAbi,
      "0xB09122F5D5db0386E38deE7C08f99c03f0484C1e"
    );

    contracts.WarriorContract = new web3.eth.Contract(
      hreoAbi,
      Addresss.WarriorAddress
    );
    contracts.KatrinaContract = new web3.eth.Contract(
      hreoAbi,
      Addresss.KatrinaAddress
    );
    contracts.RobberContract = new web3.eth.Contract(
      hreoAbi,
      Addresss.RobberAddress
    );
    contracts.MageContract = new web3.eth.Contract(
      hreoAbi,
      Addresss.MageAddress
    );
    contracts.youxiaContract = new web3.eth.Contract(
      hreoAbi,
      Addresss.YXAddress
    );
    contracts.NewPlayInfoContract = new web3.eth.Contract(
      newPlayAbi,
      Addresss.NewPlayInfoAddress
    );
    contracts.MiningContract = new web3.eth.Contract(
      mingAbi,
      Addresss.MiningAddress
    );
    contracts.NewMiningContract = new web3.eth.Contract(
      newmingAbi,
      Addresss.NewMiningAddress
    );
    contracts.LgongContract = new web3.eth.Contract(
      LinggongAbi,
      Addresss.LinggongAddress
    );
    contracts.BlacksmithContract = new web3.eth.Contract(
      BlacksmithAbi,
      Addresss.BlacksmithAddress
    );
    contracts.HunterContract = new web3.eth.Contract(
      HunterAbi,
      Addresss.HunterAddress
    );
    contracts.BookmangerContract = new web3.eth.Contract(
      BookmangerAbi,
      Addresss.BookmangerAddress
    );
    contracts.RangeworkContract = new web3.eth.Contract(
      RangeworkAbi,
      Addresss.RangeworkAddress
    );
    contracts.saleContract = new web3.eth.Contract(
      saleAbi,
      Addresss.saleAddress
    );
    contracts.saleContractNew = new web3.eth.Contract(
      newsaleAbi,
      Addresss.newSaleAddress
    );
    contracts.goldContractNew = new web3.eth.Contract(
      goldAbi,
      Addresss.NewtokenAddress
    );
    contracts.bnxContractNew = new web3.eth.Contract(
      bnxAbi,
      Addresss.BscAddress
    );
    contracts.keyContractNew = new web3.eth.Contract(
      bnxAbi,
      Addresss.IronKeyAddress
    );
    contracts.dungeonContract = new web3.eth.Contract(
      gameAbi,
      Addresss.gameManager
    );
  };

  return (
    <LocaleProvider locale={locale}>
      <Layout>
        <Head
          menu={locale["ToolCat"].Menu}
          title={locale["ToolCat"].AppTitle}
          dark={locale["ToolCat"].dark}
          light={locale["ToolCat"].light}
          Language={locale["ToolCat"].Language}
          toogleLanguage={toogleLanguage}
        />
        <Banner
          style={{ paddingTop: 70 }}
          type="warning"
          description="BNX流量高峰期间会开启防DDOS攻击, 会出现数据不显示的情况, 等高峰期过了就可以了, 发现GAS过高, 请暂时不要操作那操作, 另外, 工具猫开始收费, 请注意留意提示"
        />
        <Content
          style={{ paddingTop: 70, backgroundColor: "var(--semi-color-bg-1)" }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <MyHero
                  nowaddress={locale["ToolCat"].nowaddress}
                  address={address}
                  contracts={contracts}
                  contractss={contractss}
                />
              }
            />
            <Route
              path="/new"
              element={
                <NewCard
                  card={locale["ToolCat"].card}
                  nowaddress={locale["ToolCat"].nowaddress}
                  address={address}
                  contracts={contracts}
                  contractss={contractss}
                />
              }
            />
            <Route
              path="/hero"
              element={
                <MyHero
                  nowaddress={locale["ToolCat"].nowaddress}
                  address={address}
                  contracts={contracts}
                  contractss={contractss}
                />
              }
            />
            <Route
              path="/gold"
              element={
                <Gold
                  nowaddress={locale["ToolCat"].nowaddress}
                  address={address}
                  contracts={contracts}
                  contractss={contractss}
                />
              }
            />
            <Route
              path="/low"
              element={
                <LowPrice
                  nowaddress={locale["ToolCat"].nowaddress}
                  address={address}
                  contracts={contracts}
                  contractss={contractss}
                />
              }
            />
            <Route
              path="/mx"
              element={
                <MaoXian
                  nowaddress={locale["ToolCat"].nowaddress}
                  address={address}
                  contracts={contracts}
                  contractss={contractss}
                />
              }
            />
          </Routes>
        </Content>
        <BackTop />
      </Layout>
    </LocaleProvider>
  );
};

export default App;
