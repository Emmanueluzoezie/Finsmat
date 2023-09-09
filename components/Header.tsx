import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

function Header() {
  return (
    <div>
        <div>
            <div>
                <h2>Solana bounty</h2>
            </div>
            <nav>
                <ul>
                    <li>Checkout</li>
                    <li>Checkout</li>
                    <li>Checkout</li>
                </ul>
                <button onClick={() => signIn()}>login</button>
            </nav>
        </div>
    </div>
  )
}

export default Header