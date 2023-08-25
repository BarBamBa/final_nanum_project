import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md'
import '/src/scss/ScrollButton.scss'

function ScrollTopButton() {
    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })

    }
    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 500) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        console.log(window.scrollY)
        window.addEventListener("scroll", handleShowButton)
        return () => {
            window.removeEventListener("scroll", handleShowButton)
        }
    }, [])

    return showButton && (
        <div className="scroll__container">
            <button id="arrowTop" onClick={scrollToTop} type="button"></button>
            <label htmlFor="arrowTop"><MdOutlineKeyboardDoubleArrowUp  id="arrowTop"/></label>
        </div>

    )
}

export default ScrollTopButton