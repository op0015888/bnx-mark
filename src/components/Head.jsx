import {
  IconMoon,
  IconGallery,
  IconSimilarity,
  IconUserCircle,
  IconBold,
  IconShield,
  IconSun,
  IconUnderline,
  IconLikeThumb,
} from "@douyinfe/semi-icons";
import {
  Layout,
  Nav,
  Button,
  Popover,
  Typography,
  Dropdown,
} from "@douyinfe/semi-ui";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "../utils/util";
const { Header } = Layout;
const Head = ({ menu, light, dark, title, Language, toogleLanguage }) => {
  const body = document.body;

  const [isTheme, setTheme] = useState(body.hasAttribute("theme-mode"));

  const switchDarkTheme = () => {
    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
      setTheme(false);
    } else {
      body.setAttribute("theme-mode", "dark");
      setTheme(true);
    }
  };
  return (
    <Header
      style={{
        backgroundColor: "var(--semi-color-bg-1)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99,
      }}
    >
      <div>
        <Nav mode="horizontal" defaultSelectedKeys={["Home"]}>
        <Nav.Header>
                <IconSimilarity
                  style={{ fontSize: isMobile() ? 24 :36, color: "var(--semi-color-text-0)" }}
                />
                {
                  isMobile() ? "" : <Typography.Title heading={4}>{title}</Typography.Title>
                }
              </Nav.Header>
          {isMobile() ? (
            <>
              <Dropdown
                trigger="click"
                position="bottomLeft"
                render={
                  <Dropdown.Menu>
                    <Link to="/new">
                      <Dropdown.Item icon={<IconGallery />}>
                        {menu.chouka}
                      </Dropdown.Item>
                    </Link>
                    <Link to="/hero">
                      <Dropdown.Item icon={<IconUserCircle />}>
                        {menu.hero}
                      </Dropdown.Item>
                    </Link>
                    <Link to="/gold">
                      <Dropdown.Item icon={<IconBold />}>
                        {menu.wankuang}
                      </Dropdown.Item>
                    </Link>
                    <Link to="/mx">
                      <Dropdown.Item icon={<IconShield />}>
                        {menu.maoxian}
                      </Dropdown.Item>
                    </Link>
                    <Link to="/low">
                      <Dropdown.Item icon={<IconUnderline />}>
                        {menu.dibanjia}
                      </Dropdown.Item>
                    </Link>
                  </Dropdown.Menu>
                }
              >
                <Nav.Item
                  itemKey="card"
                  text={"BNX"}
                  style={{
                    color: "var(--semi-color-text-0)",
                  }}
                />
              </Dropdown>
              <Dropdown
                trigger="click"
                position="bottomLeft"
                render={
                  <Dropdown.Menu>
                    <Link to="/shou">
                      <Dropdown.Item icon={<IconLikeThumb />}>
                        {'扳手腕'}
                      </Dropdown.Item>
                    </Link>
                  </Dropdown.Menu>
                }
              >
                <Nav.Item
                  itemKey="card"
                  text={"手腕"}
                  style={{
                    color: "var(--semi-color-text-0)",
                  }}
                />
              </Dropdown>
            </>
          ) : (
            <>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={menu.chouka}
              >
                <Link to="/new">
                  <Nav.Item
                    itemKey="card"
                    text={isMobile() ? "" : menu.chouka}
                    icon={
                      <IconGallery
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={menu.hero}
              >
                <Link to="/hero">
                  <Nav.Item
                    itemKey="hero"
                    text={isMobile() ? "" : menu.hero}
                    icon={
                      <IconUserCircle
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={menu.wankuang}
              >
                <Link to="/gold">
                  <Nav.Item
                    itemKey="gold"
                    text={isMobile() ? "" : menu.wankuang}
                    icon={
                      <IconBold
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={menu.maoxian}
              >
                <Link to="/mx">
                  <Nav.Item
                    itemKey="mx"
                    text={isMobile() ? "" : menu.maoxian}
                    icon={
                      <IconShield
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={menu.dibanjia}
              >
                <Link to="/low">
                  <Nav.Item
                    itemKey="mx"
                    text={isMobile() ? "" : menu.dibanjia}
                    icon={
                      <IconUnderline
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={"扳手腕"}
              >
                <Link to="/shou">
                  <Nav.Item
                    itemKey="shou"
                    text={isMobile() ? "" : "扳手腕"}
                    icon={
                      <IconLikeThumb
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
            </>
          )}

          <Nav.Footer>
            <Popover
              arrowPointAtCenter
              showArrow
              content={isTheme ? light : dark}
              trigger="hover"
              style={{
                backgroundColor: isTheme ? "#FFF" : "#666",
                borderColor: isTheme ? "#FFF" : "#666",
                color: isTheme ? "#666" : "#FFF",
              }}
            >
              <Button
                theme="borderless"
                onClick={switchDarkTheme}
                icon={
                  isTheme ? <IconSun size="large" /> : <IconMoon size="large" />
                }
                style={{
                  color: "var(--semi-color-text-0)",
                  marginRight: "82px",
                }}
              />
            </Popover>
            {/* <Popover
             arrowPointAtCenter
             showArrow
             content={Language}
             trigger="hover"
             style={{
               backgroundColor: isTheme ? "#FFF" : "#666",
               borderColor: isTheme ? "#FFF" : "#666",
               color: isTheme ? "#666" : "#FFF",
             }}
           >
             <Button
               theme="borderless"
               onClick={toogleLanguage(Language === '中文' ? 'zh_CN' : 'en_US')}
               icon={<IconLanguage size="large" />}
               style={{
                 color: "var(--semi-color-text-0)",
                 marginRight: "12px",
               }}
             />
           </Popover> */}
          </Nav.Footer>
        </Nav>
      </div>
    </Header>
  );
};

export default Head;
