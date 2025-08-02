import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAddress } from '../../services/apiGeocoding'

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    const positionObj = await getPosition()

    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    }

    const addressObj = await getAddress(position)
    const parts = [
      addressObj?.locality,
      addressObj?.principalSubdivision,
      addressObj?.countryName,
    ]

    const address = parts.filter(Boolean).join(', ')

    return { position, address }
  },
)

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position
        state.address = action.payload.address
        state.status = 'idle'
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error'
        state.error =
          'Ther was an error getting your address. Make sure to fill this field!'
      }),
})

export const { updateName } = userSlice.actions
export default userSlice.reducer
