import React from 'react'

function TrendsCard() {
  
  return (
    <React.Fragment>
        <div className="trends border border-primary rounded mb-3 shadow">
            <div className="">
            <div className="text-muted ms-2">
                <span className='fw-bold'>Trends</span>
            </div>
            <ul className="list-group">
                <li><a href="#" className='text-decoration-none ms-2'>#Football</a></li>
                <li><a href="#" className='text-decoration-none ms-2'>#Ruby</a></li>
                <li><a href="#" className='text-decoration-none ms-2'>#Gaming</a></li>
                <li><a href="#" className='text-decoration-none ms-2'>#Russia</a></li>
                <li><a href="#" className='text-decoration-none ms-2'>#Programing</a></li>
            </ul>
            </div>
        </div>
    </React.Fragment>
  )
}

export default TrendsCard