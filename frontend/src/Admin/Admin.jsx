// import React, { useState } from 'react'
// import {useNavigate, Routes, Route} from 'react-router-dom';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import InboxIcon from '@mui/icons-material/Inbox';
// import CssBaseline from '@mui/material/CssBaseline';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import {useMediaQuery,ListItemText,useTheme,Drawer, Box, Toolbar, List, ListItem, ListItemButton, ListItemIcon} from '@mui/material'
// import CreateProductForm from './components/CreateProductForm';
// import ProductsTable from './components/ProductsTable';
// import OrdersTable from './components/OrdersTable';
// import CustomerTable from './components/CustomerTable';
// import Dashboard from './components/Dashboard';
// import AdminDashboard from './components/Dashboard';
// const menu = [
//     {name:"Dashboard", path:"/admin", icon:<DashboardIcon/>},
//     {name:"Products", path:"/admin/products",icon:<DashboardIcon/>},
//     {name:"AddProduct", path:"/admin/product/create",icon:<DashboardIcon/>},
//     {name:"Custormers", path:"/admin/customers",icon:<DashboardIcon/>},
//     {name:"Orders", path:"/admin/orders",icon:<DashboardIcon/>},
//     {name:"", path:""},
// ]
// const Admin = () => {
//     const theme = useTheme();
//     const isLargeScreean = useMediaQuery(theme.breakpoints.up("lg"));
//     const [sideBarVisible, setSideBarVisible] = useState(false);
//     const navigate = useNavigate();
//     const drawer = (
//         <Box sx={{overflow:"auto",
//         display:"flex",
//         flexDirection:"column",
//         justifyContent:"space-between",
       
//         height:"100%"
//         }} >
//             {isLargeScreean && <Toolbar/>}
//             <List>
//                  {menu.map((item, index)=><ListItem key={item.name} disablePadding onClick={()=>navigate(item.path)}>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             {item.icon}
//                         </ListItemIcon>
//                         <ListItemText>
//                             {item.name}
//                         </ListItemText>
//                     </ListItemButton>
//                  </ListItem>)}
                 
//             </List>
//             <List>
//                  <ListItem   disablePadding >
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <AccountCircleIcon/>
                            
//                         </ListItemIcon>
//                         <ListItemText>
//                             Account
//                         </ListItemText>
//                     </ListItemButton>
//                  </ListItem>
                 
//             </List>
//         </Box>
//     )
//     return (
//     <div>
//       <div className='flex items-start space-between h-[100vh]  '>
//             <CssBaseline/>
//             <div
//          className='w-[15%] border border-r-gray-300 h-full'
//           >
//             {drawer}
//           </div>
           
//           <div className='w-[68%]    '>
//                 <Routes>
//                 <Route path='/' element={<AdminDashboard/>}></Route>
//                 <Route path='/product/create' element={<CreateProductForm/>}></Route>
//                 <Route path='/products' element={<ProductsTable/>}></Route>
//                 <Route path='/orders' element={<OrdersTable/>}></Route>
//                 <Route path='/customers' element={<CustomerTable/>}></Route>
//                 </Routes>
//           </div>
//       </div>
//     </div>
//   )
// }

// export default Admin
// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   PieChartOutlined,
//   CodeSandboxOutlined,
//   AppstoreAddOutlined,
//   LogoutOutlined,
//   TagOutlined,
// } from '@ant-design/icons';
// import { Breadcrumb, Layout, Menu, Space, theme } from 'antd';

// const { Header, Content, Footer, Sider } = Layout;

// function getItem(
//   label,
//   key,
//   icon,
//   children,
// ) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }

// const items = [
//   getItem(<Link to={"/admin/dashboard"}>Dashboard</Link>, '1', <PieChartOutlined />),
//   getItem('Products', 'sub1', <CodeSandboxOutlined />, [
//     getItem(<Link to={"/admin/product/create"}>Create New</Link>, '3'),
//     getItem(<Link to={"/admin/products"}>View List</Link>, '4'),
//   ]),
//   getItem('Categorys', 'sub2', <AppstoreAddOutlined />, [
//     getItem(<Link to={"/admin/category/add"}>Create New</Link>, '5'),
//     getItem(<Link to={"/admin/category"}>View List</Link>, '6'),
//   ]),
//   getItem('Chuyen Muc', 'sub2', <AppstoreAddOutlined />, [
//     getItem(<Link to={"/admin/chuyenmuc/add"}>Create New</Link>, '5'),
//     getItem(<Link to={"/admin/chuyenmuc"}>View List</Link>, '6'),
//   ]),
//   getItem(<Link to={"/admin/order"}>Order</Link>, '7', <TagOutlined />),
//   getItem(<Link to={"/"}>Logout</Link>, '9', <LogoutOutlined />),
// ];

// const AdminLayout = ({ children }) => {
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider
//         style={{
//           overflow: 'auto',
//           height: '100vh',
//           position: 'fixed',
//           left: 0,
//           top: 0,
//           bottom: 0,
//         }}
//       >
//         <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
//       </Sider>
//       <Layout style={{ marginLeft: 200 }}>
//         <Content className=''>
//           <div className='bg-slate-50' style={{ padding: 24, minHeight: 360 }}>
//             {children}
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminLayout;
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import {
  PieChartOutlined,
  CodeSandboxOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import CreateProductForm from './components/CreateProductForm';
import ProductsTable from './components/ProductsTable';
import OrdersTable from './components/OrdersTable';
import CustomerTable from './components/CustomerTable';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/Dashboard';
import CategoryAdd from './components/categoryAdd';
import CategoryList from './components/CategoryTable';

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to="/admin/dashboard">Dashboard</Link>, '1', <PieChartOutlined />),
  getItem('Products', 'sub1', <CodeSandboxOutlined />, [
    getItem(<Link to="/admin/product/create">Create New</Link>, '3'),
    getItem(<Link to="/admin/products">View List</Link>, '4'),
  ]),
  getItem('Categories', 'sub2', <AppstoreAddOutlined />, [
    getItem(<Link to="/admin/category/add">Create New</Link>, '5'),
    getItem(<Link to="/admin/category/list">View List</Link>, '6'),
  ]),
  getItem('Orders', '7', <TagOutlined />, [
    getItem(<Link to="/admin/orders">View Orders</Link>, '8'),
  ]),
  getItem(<Link to="/">Logout</Link>, '9', <LogoutOutlined />),
];

const AdminLayout = ({ children }) => {
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content className=''>
          <div className='bg-slate-50' style={{ padding: 24, minHeight: 360 }}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="product/create" element={<CreateProductForm />} />
              <Route path="products" element={<ProductsTable />} />
              <Route path="orders" element={<OrdersTable />} />
              <Route path="customers" element={<CustomerTable />} />
              <Route path="category/add" element={<CategoryAdd/>}/>
              <Route path="category/list" element={<CategoryList/>}/>

              {children}
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;