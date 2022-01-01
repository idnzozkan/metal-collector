import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { MetalContext } from '../contexts/metalContext'
import { moveToTarget, scan } from '../requests/robot'

const Actions = () => {
    const [scanning, setScanning] = useState(false)
    const { detectedMetals, setDetectedMetals } = useContext(MetalContext)

    const selectedMetal = detectedMetals.find(metal => metal.isSelected)

    const handleCollectBtn = async () => {
        try {
            await moveToTarget(selectedMetal.position)
            selectedMetal.isCollected = true
        } catch (error) {
            console.log(error)
        }
    }

    const handleScanBtn = async () => {
        try {
            setScanning(true)
            const metals = await scan()
            if (metals.length) {
                setScanning(false)
                setDetectedMetals(metals)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <Wrapper>
                <CollectButton show={detectedMetals.filter(m => !m.isCollected).length} onClick={handleCollectBtn}>Collect</CollectButton>
                <ScanButton show={!scanning} onClick={handleScanBtn}>Start Scanning</ScanButton>
                <PromisedScanButton show={scanning}>Scanning...</PromisedScanButton>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    margin-bottom: 2rem;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`

const ScanButton = styled.button`
    display: ${props => props.show ? 'inline' : 'none'};
    border: none;
    outline-color: #d65c24;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    background: #FE844B;
    color: white;
    transition: all 200ms ease-in;

    &:hover {
        background: #f37a42;
    }

    &:active {
        background: #d65c24;
    }
`

const PromisedScanButton = styled.button`
    display: ${props => props.show ? 'inline' : 'none'};
    position: relative;
    border: none;
    outline: none;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    cursor: wait;
    font-size: 1rem;
    background: #f37a4290;
    color: white;
    transition: all 200ms ease-in;
    min-width: 152.95px;
`

const CollectButton = styled.button`
    display: ${props => !props.show ? 'none' : 'inline'};
    border: none;
    outline-color: #68D7A8;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    background: #68D7A8;
    color: white;
    transition: all 200ms ease-in;
    margin-right: 1rem;

    &:hover {
        background: #55c797;
    }

    &:active {
        background: #34c488;
    } 
`

export default Actions
