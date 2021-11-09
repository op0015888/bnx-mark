import styled from "styled-components";
import {
  IconMoon,
  IconGallery,
  IconSimilarity,
  IconUserCircle,
  IconBold,
  IconShield,
  IconSun,
  IconUnderline,
  IconLanguage
} from "@douyinfe/semi-icons";
import { Layout, Nav, Button, Popover, Typography } from "@douyinfe/semi-ui";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "../utils/util";
const { Header } = Layout;
const Head = ({menu, light, dark, title, Language, toogleLanguage}) => {
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
              style={{ fontSize: 36, color: "var(--semi-color-text-0)" }}
            />
            {isMobile() ? (
              ""
            ) : (
              <Typography.Title heading={4}>{title}</Typography.Title>
            )}
          </Nav.Header>
          <Popover arrowPointAtCenter showArrow trigger="hover" content={menu.chouka}>
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
          <Popover arrowPointAtCenter showArrow trigger="hover" content={menu.maoxian}>
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
                  marginRight: "12px",
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
