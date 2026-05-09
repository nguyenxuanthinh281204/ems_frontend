import React from 'react'

export const HeaderComponent = () => {
  return (
    <div>
        <header style={{backgroundColor: 'black' , width: '100%', height: '50px'}}>
            <nav className='navbar navbar-dark bg-dark'>
                <a className='navbar-brand' href='https://www.google.com'>Employee Management System</a>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent;
