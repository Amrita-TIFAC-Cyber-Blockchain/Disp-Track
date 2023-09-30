import { useState } from 'react'
import '../App.css'
import ConnectWallet from './ConnectWallet'

function Navbar() {
    return (
        <>
            <div className="nav">
                <img src="disptrackLogo.png" className="nav--logo" />
                <div className='nav--buttons'>
                    <ConnectWallet />
                    <a href=""><img src="profile.png" className="nav--profile"/></a>
                </div>
            </div>
        </>
    )
}

export default Navbar