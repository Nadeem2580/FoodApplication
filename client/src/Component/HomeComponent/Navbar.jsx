import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import saylaniPapa from "../../assets/saylaniPapa.png"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cookie from "js-cookie"
import axios from "../../Pages/Utils/axiosConfig"
import { useDispatch } from 'react-redux';
import { setRole } from '../../ReduxSlices/slices';
function Navbar( {  links }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    let dispatch = useDispatch()
    const [anchorButton, setAnchorButton] = React.useState(null);
    const navigate = useNavigate()
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenButtonMenu = (event) => {
        setAnchorButton(event.currentTarget)
    }

    const handleCloseButtonMenu = () => {
        setAnchorButton(null)
    }

    const logoutFunc = () => {
        Cookie.remove("token")
        Cookie.set(null)
        axios.defaults.baseURL = ""
        dispatch(setRole(null))
        navigate("/")
    }
    const ButtonswithBascket = () => {
        return (
            <Box sx={{ display: "flex", gap: "15px" }}>
                <IconButton >

                    <ShoppingCartIcon sx={{ color: "#fff" }} />

                </IconButton>
                <Link to={"/login"} style={{ textDecoration: "none", color: "#3b82f6", display: "flex", alignItems: "center" }}>
                    <Button sx={{ background: "white", padding: "10px 20px", fontSize: "13px", fontWeight: "700", ":hover": { background: "#3b82f6", color: "#fff" } }}>
                        <PersonOutlineIcon /> Sign in </Button></Link>

                
                <Button onClick={logoutFunc} variant='contained' sx={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", fontWeight: 700 }}>
                    Log out<LogoutIcon sx={{ fontSize: "12px", color: "#fff" }} />
                </Button>
            </Box>
        )
    }


    return (
        <>
        <AppBar position="static" sx={{ background: "#8dc63f" }}>
            <Container maxWidth="xl">

                <Stack justifyContent={"space-between"} direction={"row"}>
                    {/* Image logo  */}
                    <Box >
                        <img src={saylaniPapa} alt="" width={200} height={80} />
                    </Box>
                    {/* Home about links are maping */}
                    <Box sx={{ display: { xs: 'none', lg: 'flex', alignItems: "center" } }}>
                        {links.map((page) => (
                            <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                <Typography sx={{ textAlign: 'center', fontSize: "13px" }}>
                                    <Link to={page.url} style={{ textDecoration: "none", color: "white", display: "flex", gap: "5px" }}>
                                        {page.icon}
                                        {page.title}
                                    </Link>
                                </Typography>
                            </MenuItem>
                        ))}
                    </Box>
                    <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center" }}>
                        <ButtonswithBascket />
                    </Box>
                    {/* Large screen button and basket (md only) */}
                    <Box sx={{ display: { xs: "none", md: "flex", lg: "none" }, alignItems: "center" }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-button"
                            aria-haspopup="true"
                            onClick={handleOpenButtonMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-button"
                            anchorEl={anchorButton}   // ✅ yaha pe anchorButton
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorButton)}   // ✅ is menu ka apna state
                            onClose={handleCloseButtonMenu}
                            sx={{ marginTop: "18px", marginLeft: "8px" }}
                        >
                            {links.map((page) => (
                                <MenuItem key={page.title} onClick={handleCloseButtonMenu} sx={{ background: "#8dc63f", ":hover": { background: "#4a7212ff" } }} >
                                    <Typography sx={{ textAlign: 'center' }}>
                                        <Link to={page.url} style={{ textDecoration: "none", color: "white", display: "flex", gap: "5px" }}>
                                            {page.icon}
                                            {page.title}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                            <MenuItem sx={{ background: "#8dc63f", ":hover": { background: "#4a7212ff" } }}>
                                <ButtonswithBascket />
                            </MenuItem>
                        </Menu>
                        <Button onClick={logoutFunc} variant='contained' sx={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", fontWeight: 700 }}>
                            Log out<LogoutIcon sx={{ fontSize: "12px", color: "#fff" }} />
                        </Button>

                    </Box>

                    {/* Mobile menu (xs only) */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: "end" }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {links.map((page) => (
                                <MenuItem key={page.title} onClick={handleCloseNavMenu} sx={{ background: "#8dc63f", ":hover": { background: "#4a7212ff" } }} >
                                    <Typography sx={{ textAlign: 'center' }}>
                                        <Link to={page.url} style={{ textDecoration: "none", color: "white", display: "flex", gap: "5px" }}>
                                            {page.icon}
                                            {page.title}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}

                            <MenuItem sx={{ background: "#8dc63f", ":hover": { background: "#4a7212ff" } }}>
                                <ButtonswithBascket />
                            </MenuItem>
                        </Menu>

                    </Box>
                </Stack>
            </Container>
        </AppBar>
<Outlet />
        </>

);
}
export default Navbar;
