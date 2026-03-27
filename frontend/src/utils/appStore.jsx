import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'
import { feedSlice} from './feedSlice'
import {connectionsSlice} from './connectionsSlice'
import { requestSlice } from './requestSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    feed: feedSlice.reducer,
    connections: connectionsSlice.reducer,
    requests: requestSlice.reducer,
  },
})