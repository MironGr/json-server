import React from 'react'

import { Admin, Resource, ListGuesser } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'


const data = jsonServerProvider('http://127.0.0.1:8080')

export const App: React.FC = () => {

  return (
    <Admin dataProvider={data}> 
      <Resource name='users' list={ListGuesser}/>
    </Admin>
  )
}

