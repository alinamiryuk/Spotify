import {
  ADD_PLAYLIST_REDUCER, END_FETCHING,
  GENERATE_PLAYLISTS, GET_MUSIC, GET_USER_PLAYLISTS,
  LOG_IN_USER, LOG_OUT_USER,
  REGISTER_USER,
  SHOW_AUTHORS, START_FETCHING,
} from './action'

export const loginUser = (result) => ({
  type: LOG_IN_USER,
  payload: {
    success: result.success,
    user: result
  }
})

export const registerUser = (result) => ({
  type: REGISTER_USER,
  payload: {
    success: result.success,
    user: result
  }
})

export const logoutUser = () => ({
  type: LOG_OUT_USER,
  payload: null
})

export const showAuthors = (authors) => ({
  type: SHOW_AUTHORS,
  payload: authors
})

export const generatedPlaylists = (playlists) => ({
  type: GENERATE_PLAYLISTS,
  payload: playlists
})

export const showUserPlaylist = (playlists) => ({
  type: GET_USER_PLAYLISTS,
  payload: playlists.playlists
})

export const addPlaylist = (playlist) => ({
  type: ADD_PLAYLIST_REDUCER,
  payload: {
    id: playlist.id,
    data: playlist
  }
})

export const getMusic = (id) => ({
  type: GET_MUSIC,
  payload: id
})

export const startFetching = () => ({
  type: START_FETCHING,
  payload: true,
})

export const endFetching = () => ({
  type: END_FETCHING,
  payload: false
})

export const fetchUserLogin = (body) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const user = await response.json()
  localStorage.setItem('user', JSON.stringify(user))
  dispatch(loginUser(user))
}

export const fetchUserRegistration = (body) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const result = await response.json()
  localStorage.setItem('user', JSON.stringify(result))
  if (result.success) dispatch(registerUser(result))
}

export const fetchAuthors = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  const res = await fetch('/api/playlist/authors', {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
  const authors = await res.json()
  authors.forEach(obj => obj.hide = true)
  for (let i = authors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = authors[i]
    authors[i] = authors[j]
    authors[j] = temp
  }
  dispatch(showAuthors(authors))
}

export const fetchGeneratePlaylists = (likedAuthorsArray) => async (dispatch) => {
  dispatch(startFetching())
  const token = JSON.parse(localStorage.getItem('user')).token
  const res = await fetch('/api/playlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({
      likedAuthorsArray
    })
  })
  const playlists = await res.json()
  console.log('generated',[playlists])

  dispatch(generatedPlaylists(playlists))
  dispatch(endFetching())
}

export const fetchUserPlaylists = () => async (dispatch) => {
  dispatch(startFetching())
  console.log(123)
  const token = JSON.parse(localStorage.getItem('user')).token
  const response = await fetch('/api/playlist', {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
  const playlists = await response.json()
  console.log('getted')
  dispatch(endFetching())
  dispatch(showUserPlaylist(playlists))
}

export const fetchMusic = (id, genre) => async (dispatch) => {
  dispatch(startFetching())
  const token = JSON.parse(localStorage.getItem('user')).token
  const response = await fetch(`/api/playlist/${id}?genre=${genre}`, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
  const music = await response.json()
  dispatch(endFetching())
  dispatch(getMusic(id))
}
