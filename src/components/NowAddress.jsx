import { Typography, Button } from "@douyinfe/semi-ui";
import icons from "../assets/vip.png";

const NowAddress = ({ address, contractss, nowaddress = "" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        flexWrap: "wrap",
        color: "var(--semi-color-text-0)",
      }}
    >
      {/* {contractss > Number(String(new Date().getTime()).substr(0, 10)) ? (
        <img src={icons} style={{ width: 20, height: 20, marginRight: 10 }} />
      ) : (
        <Button>充值会员</Button>
      )} */}
      <Typography.Text
        copyable
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          color:
            contractss > Number(String(new Date().getTime()).substr(0, 10))
              ? "red"
              : "var(--semi-color-text-0)",
        }}
      >
        {address}
      </Typography.Text>
    </div>
  );
};

export default NowAddress;
