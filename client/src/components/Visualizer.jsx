import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { io } from "socket.io-client"
import { MetalContext } from '../contexts/metalContext'
import { RobotContext } from '../contexts/robotContext'
import axios from 'axios'
import { Tooltip } from '@mui/material'

const Visualizer = () => {
    const { currentPosition, setCurrentPosition } = useContext(RobotContext)
    const { detectedMetals, setDetectedMetals, setSelectedMetal } = useContext(MetalContext)

    useEffect(() => {
        const getInitialPosition = async () => {
            try {
                const res = await axios.get('/robot/position')
                setCurrentPosition({ x: res.data.x, y: res.data.y })
            } catch (error) {
                console.log(error)
            }
        }

        getInitialPosition()
    }, [])

    useEffect(() => {
        const socket = io('ws://localhost:8080')

        socket.on('connnection', () => {
            console.log('connected to server');
        })

        socket.on('update-robot-position', (position) => {
            setCurrentPosition({ x: position.x, y: position.y })
            // setCurrentPosition(prev => ({ ...prev, x: position.x, y: position.y }))
        })

        socket.on('message', (message) => {
            console.log(message);
        })

        socket.on('disconnect', () => {
            console.log('Socket disconnecting');
        })
    }, [])

    const handleMetalClick = (id) => {
        setDetectedMetals(
            detectedMetals.map(metal => {
                if (metal.id === id && !metal.isSelected) {
                    return { ...metal, isSelected: true }
                } else {
                    return { ...metal, isSelected: false }
                }
            })
        )
    }

    return (
        <Container>
            <Wrapper>
                <Workspace>
                    <Robot x={currentPosition.x} y={currentPosition.y} />
                    {detectedMetals?.map(metal => (
                        !metal.isCollected && (
                            <Tooltip title={`X: ${metal.position.x} Y: ${metal.position.y}`} arrow placement='top'>
                                <Metal x={metal.position.x} y={metal.position.y} onClick={() => handleMetalClick(metal.id)} isSelected={metal.isSelected} key={metal.id} />
                            </Tooltip>
                        )
                    ))}
                </Workspace>
                <Position>X: {currentPosition.x} Y: {currentPosition.y}</Position>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    background-color: white;
    border-radius: 20px;
    height: 100%;
    transition: all 100ms ease-in;

    &:hover {
        -webkit-box-shadow: 0px 6px 10px -8px #464b4e15;
        box-shadow: 0px 6px 10px -8px #464b4e15;
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 2rem;
`

const Workspace = styled.div`
    position: relative;
    border: 2px solid #f1f1f1; 
    width: 510px;
    height: 370px;
`

const Position = styled.p`
    width: 100%;
    margin-top: 0.5rem;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #A5BCCA;
`

const Robot = styled.div`
    position: absolute;
    left: ${props => 1.85882353 * props.x}px;
    top: ${props => -1.80540541 * props.y}px;
    background: #FF7EBA;
    border-radius: 2px;
    width: 32px;
    height: 32px;
    transition: all 200ms ease-in-out;
    z-index: 1;
`

const Metal = styled.div`
    position: absolute;
    left: ${props => 1.89019608 * props.x}px;
    top: ${props => -1.84864865 * props.y}px;
    background: ${props => props.isSelected ? '#55c797' : '#C4F2DF'};
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
`

export default Visualizer
