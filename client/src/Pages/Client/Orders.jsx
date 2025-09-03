import React, { useEffect, useState } from 'react'
import api from '../Utils/axiosConfig'
import { Card, CardContent, Box, Typography, Chip, Divider, Stack, Grid, Container } from "@mui/material";
const UserOrder = () => {
  const [userOrder, setUserOrder] = useState([])
  useEffect(() => {
    fetchOrder()
  }, [])
  const fetchOrder = async () => {
    const orders = await api.get(`/api/orders/get-order`)
    setUserOrder(orders.data.data)

    console.log(orders.data.data, "orders")
  }

  return (
    <>
      {
        userOrder.map((item, index) => {
          return (
            <Container maxWidth="lg" sx={{marginTop:"50px"}}>


              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                  <Card sx={{ maxWidth: 600, mb: 3, borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                      {/* Header */}
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6">Order Id#{item._id.slice(-6)}</Typography>
                        {/* <Chip label={item.status} color={getStatusColor(item.status)} /> */}
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        Payment: {item.paymentMethod.replace("_", " ")}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date: {new Date(item.createdAt).toLocaleString()}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Stack spacing={1}>


                        {item.items.map((item) => (
                          <Box
                            key={item._id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography variant="body1">
                              {item.name} x{item.quantity}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Rs. {item.price}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>

                      <Divider sx={{ my: 2 }} />


                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1" fontWeight="bold">
                          Total
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Rs. {item.totalAmount}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>

          )
        })
      }

    </>
  )
}

export default UserOrder