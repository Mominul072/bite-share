
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import {
  DashboardOutlined,
  TeamOutlined,
  DollarOutlined,
  ShoppingOutlined,
  CoffeeOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import "../layouts/icon.css";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const { Header, Sider, Content } = Layout;

const DefaultLayOuts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleMenuClick = (key) => {
    setSelectedKey(key);
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
        }}
        breakpoint="md"
        collapsedWidth="80"
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        {/* Logo Design */}
        <div
          className="logo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 0",
          }}
        >
          <BgColorsOutlined
            className="custom-icon"
            style={{ fontSize: 32, color: "#1890ff" }}
          />
        </div>

        {/* Menu List */}
        <Menu
          mode="inline"
          theme="dark"
          className="menu-bar"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
        >
          <Menu.Item
            key="/"
            icon={<DashboardOutlined style={{ fontSize: "24px" }} />}
          >
            {!collapsed && "Dashboard"}
          </Menu.Item>
          <Menu.Item
            key="/membar"
            icon={<TeamOutlined style={{ fontSize: "30px" }} />}
          >
            {!collapsed && "Membar"}
          </Menu.Item>
          <Menu.Item
            key="/deposit"
            icon={<ShoppingOutlined style={{ fontSize: "24px" }} />}
          >
            {!collapsed && "Deposit"}
          </Menu.Item>
          <Menu.Item
            key="/market"
            icon={<DollarOutlined style={{ fontSize: "24px" }} />}
          >
            {!collapsed && "Market"}
          </Menu.Item>
          <Menu.Item
            key="/meal"
            icon={<CoffeeOutlined style={{ fontSize: "24px" }} />}
          >
            {!collapsed && "Meal"}
          </Menu.Item>
          <Menu.Item
            key="/summary"
            icon={<CoffeeOutlined style={{ fontSize: "24px" }} />}
          >
            {!collapsed && "Summary"}
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.3s",
        }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: isMobile ? "0 16px" : "0 24px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "fixed",
            width: "100%",
            zIndex: 1,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "left 0.3s",
            left: 0, // Header stays fixed to the left
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                transition: "transform 0.3s",
              }}
            />
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginLeft: "16px",
              }}
            >
              Bite & Share
            </span>
          </div>

          <div>
            <Link to="/login">
              <Button
                type="primary"
                icon={<LoginOutlined />}
                onClick={handleLogout}
                style={{
                  marginRight: "8px",
                  transition: "background-color 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#40a9ff";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#1890ff";
                  e.target.style.transform = "scale(1)";
                }}
              >
                LogOut
              </Button>
            </Link>
          </div>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: "64px 16px 24px", // Adjust margin to accommodate the fixed header
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            overflowY: "auto", // Enable vertical scroll
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayOuts;
