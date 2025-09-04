import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useSelector } from "react-redux";



const ContentModal = ({ openDetail, openAddress, setOpenDetail, setOpenAddress }) => {



    const { selectedRestaurant } = useSelector((store) => store.Counter)
console.log(selectedRestaurant ,"selectedRestaurant")
    const handleClose = () => {
        if (openDetail) {
            setOpenDetail(false)
        } else {
            setOpenAddress(false)
        }
    }



    return (
        <Dialog open={openDetail || openAddress} onClose={() => { setOpenDetail(false); setOpenAddress(false) }} fullWidth maxWidth="sm">
            <DialogTitle>{openAddress ? "Restaurant Address" : "Restaurant Detail"}</DialogTitle>
            <DialogContent dividers>
                {selectedRestaurant && (
                    <Typography>
                        {selectedRestaurant.address || "No address available"}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ContentModal