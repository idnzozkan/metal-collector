import React,  } from 'react'
import styled from 'styled-components'

const MetalCircle = ({ x, y, selectedMetal, setSelectedMetal, clickedMetal, setClickedMetal }) => {

    const handleMetalClick = (e) => {
        setClickedMetal({ x, y })

        if (selectedMetal?.x === x && selectedMetal?.y === y) {
            e.target.style.background = '#C4F2DF'
            setSelectedMetal(null)
        }
        else {
            setSelectedMetal(null)
            e.target.style.background = '#55c797'
            setSelectedMetal({ x, y })
        }
    }
    console.log(selectedMetal)

    return (
        <Metal x={x} y={y} onClick={e => handleMetalClick(e)} />
    )
}

const Metal = styled.div`
    position: absolute;
    left: ${props => 1.89019608 * props.x}px;
    top: ${props => -1.84864865 * props.y}px;
    background: #C4F2DF;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
`

export default MetalCircle
