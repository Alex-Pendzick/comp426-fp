import React from 'react'
import { Button } from 'react-bootstrap'

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
    return (
      <div>
        {gotoPrevPage && <Button className="w-50 mt-2" onClick={gotoPrevPage}>See previous buddies!</Button>}
        {gotoNextPage && <Button className="w-50 mt-2" onClick={gotoNextPage}>See more buddies!</Button>}
      </div>
    )
  }