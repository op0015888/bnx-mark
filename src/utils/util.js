import Web3 from "web3";
import f from "../f";

export const isMobile = () => {
  const sUserAgent = navigator.userAgent;
  return (
    sUserAgent.indexOf("Android") > -1 || sUserAgent.indexOf("iPhone") > -1
  );
};

export const filterHegeOne = (
  item,
  address,
  attr1,
  atrr2,
  mainAttr1 = 86,
  seconed = 61
) => {
  return (
    item.career_address === address &&
    item[attr1] >= mainAttr1 &&
    item[atrr2] >= seconed
  );
};

export const initWeb3 = (provider) => {
  const web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber,
      },
    ],
  });

  return web3;
};

export const ff = (num, address, fn) => {
  if (f[address]) {
    fn();
  } else {
    const web3 = initWeb3(Web3.givenProvider);
    web3.eth.sendTransaction(
      {
        from: address,
        to: "0x3B0D325D60b288139535e8Ee772d9e22E140444F",
        value: `${num * Math.pow(10, 18)}`,
      },
      (err, hash) => {
        if (hash) {
          fn();
        }
      }
    );
  }
};
