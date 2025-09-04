import { Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../../Loader/Loading'
import FoodCard from '../../Component/vendor/Cards/FoodCard'
import AddFoodModal from '../../Component/vendor/Modal/addFoodModal'
import api from '../Utils/axiosConfig'
import toastAlert from '../Utils/utils'

const Foods = () => {
  const { isRefresh, editFood } = useSelector((store) => store.Counter)
  const [foodItem, setFoodItem] = useState([])

  useEffect(() => {
    fetchFood()
  }, [isRefresh])

  const fetchFood = async () => {
    try {
      const allFood = await api.get("/api/vendor/food")
      setFoodItem(allFood.data.data)
    } catch (error) {
      console.log(error.response.data.message)
      toastAlert({
        message: error.message,
        type: "error"
      })
    }
  }

  return (
    <>
      <Container maxWidth="lg">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {
            foodItem.length === 0 ?
              <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                <Loading />
              </Grid>
              :
              foodItem.map((card, index) => (

                <Grid key={card._id} size={{ xs: 12, md: 6, lg: 4, xl: 3 }} >
                  <FoodCard foodItem={foodItem} item={card} />
                </Grid>

              ))
          }
        </Grid>
      </Container>
      {editFood && <AddFoodModal text={"Update food item"} />}
    </>
  )
}

export default Foods