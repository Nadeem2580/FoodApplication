import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FlatwareIcon from '@mui/icons-material/Flatware';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Button } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Cookie from "js-cookie";
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { setRole } from '../../ReduxSlices/slices';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function AdminLayout({ children }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logoutFunc = () => {
        Cookie.remove("token")
        Cookie.remove("role")
        dispatch(setRole(null))
        navigate("/")

    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: "#8dc63f" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex" }}>

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                {
                                    mr: 2,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Box sx={{ color: "#3b82f6" }}>
                            <Typography variant="h5" fontWeight="bold" noWrap component="div">
                                Vendor Dashboard
                            </Typography>

                            <Typography variant="caption" noWrap component="div">
                                Manage your restaurant and orders
                            </Typography>
                        </Box>
                    </Box>

                    <Button onClick={logoutFunc} variant='contained' sx={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", fontWeight: 700 }}>
                        Log out<LogoutIcon sx={{ fontSize: "12px", color: "#fff" }} />
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {[{ title: "Dashboard", url: "/admin-dashboard", icon: <DashboardIcon sx={{ color: "#8dc63f" }} /> },
                    { title: "Vendors", url: "/admin-vendor", icon: <PersonIcon sx={{ color: "#8dc63f" }} /> },
                    { title: "Users", url: "/admin-user", icon: <GroupIcon sx={{ color: "#8dc63f" }} /> },
                    { title: "Restaurants", url: "/admin-restaurant", icon: <RestaurantMenuIcon sx={{ color: "#8dc63f" }} /> }].map((page, index) => (
                        <ListItem key={page.title} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {page.icon}
                                </ListItemIcon>
                                <Link to={page.url} style={{ textDecoration: "none", color: "#3b82f6" }}>
                                    <Typography sx={{ fontSize: "14px", ":hover": { textDecoration: "underline" } }}>{page.title}</Typography></Link>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>
    );
}
