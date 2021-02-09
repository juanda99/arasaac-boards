import React, { FC, ReactElement } from 'react';
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/Board'),
  { ssr: false }
)

const BoardPage: FC = (): ReactElement  => {


  return (
    <div>
      <h1>Board Page</h1>
      <DynamicComponentWithNoSSR />
    </div>
  )
}

export default BoardPage
