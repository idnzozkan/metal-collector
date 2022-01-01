import React, { useContext } from 'react'
import styled from 'styled-components'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ModeStandbyIcon from '@mui/icons-material/ModeStandby'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import { Tooltip, Modal } from '@mui/material'
import { moveByDirection, moveToTarget, setToZero } from '../requests/robot'
import { RobotContext } from '../contexts/robotContext'

const Controllers = () => {
    const { setCurrentPosition } = useContext(RobotContext)

    const handleMoveByDirection = async (direction) => {
        await moveByDirection(direction)
    }

    const handleMoveToTarget = async (target) => {
        await moveToTarget(target)
    }

    const handleSetToZero = async () => {
        await setToZero()
        setCurrentPosition({ x: 0, y: 0 })
    }

    const [open, setOpen] = React.useState(false)
    const [target, setTarget] = React.useState({ x: null, y: null })

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleInput = e => {
        if (e.target.name === 'x-value') setTarget(prev => ({ ...prev, x: e.target.value }))
        if (e.target.name === 'y-value') setTarget(prev => ({ ...prev, y: e.target.value }))
    }

    return (
        <Container>
            <TopWrapper>
                <TopKeys>
                    <Key type="left-forward" onClick={() => handleMoveByDirection('left-forward')}>
                        <ArrowUpwardIcon />
                    </Key>
                    <Key type="forward" onClick={() => handleMoveByDirection('forward')}>
                        <ArrowUpwardIcon />
                    </Key>
                    <Key type="right-forward" onClick={() => handleMoveByDirection('right-forward')}>
                        <ArrowUpwardIcon />
                    </Key>
                </TopKeys>
                <MiddleKeys>
                    <Key type="left" onClick={() => handleMoveByDirection('left')}>
                        <ArrowUpwardIcon />
                    </Key>
                    <Tooltip title="Move to a custom position" placement='top' arrow>
                        <Key type="move-to" onClick={handleClickOpen}>
                            <ModeStandbyIcon />
                        </Key>
                    </Tooltip>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <MoveToModal>
                            <ModalWrapper>
                                <div>
                                    <input type="number" placeholder='X Value' name="x-value" onChange={(e) => handleInput(e)} />
                                    <input type="number" placeholder='Y Value' name="y-value" onChange={(e) => handleInput(e)} />
                                </div>
                                <button onClick={() => handleMoveToTarget(target)}>Move</button>

                            </ModalWrapper>
                        </MoveToModal>
                    </Modal>
                    <Key type="right" onClick={() => handleMoveByDirection('right')}>
                        <ArrowUpwardIcon />
                    </Key>
                </MiddleKeys>
                <BottomKeys>
                    <Key type="left-backward" onClick={() => handleMoveByDirection('left-backward')}>
                        <ArrowUpwardIcon />
                    </Key>
                    <Key type="backward" onClick={() => handleMoveByDirection('backward')}>
                        <ArrowUpwardIcon />
                    </Key>
                    <Key type="right-backward" onClick={() => handleMoveByDirection('right-backward')}>
                        <ArrowUpwardIcon />
                    </Key>
                </BottomKeys>
            </TopWrapper>
            <BottomWrapper>
                <ResetToZero onClick={handleSetToZero}>
                    <MyLocationIcon />
                    Set To Zero
                </ResetToZero>
                <ReturnToZero onClick={() => handleMoveToTarget({ x: 0, y: 0 })}>
                    <SettingsBackupRestoreIcon />
                    Return To Zero
                </ReturnToZero>
            </BottomWrapper>
        </Container>
    )
}

const Container = styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const TopWrapper = styled.div`
    padding: 0 6rem;
`

const TopKeys = styled.div`
    display: flex;
`

const MiddleKeys = styled.div`
    display: flex;
`

const BottomKeys = styled.div`
    display: flex;
`

const Key = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    color: #B2C7D1;
    width: 100%;
    height: 10vh;
    border: none;
    border-radius: 20px;
    margin: 0 2rem 2rem 0;
    cursor: pointer;
    transition: all 100ms ease-in;
    outline-color: #4F7D96; 

    &:nth-child(3n) {
        margin: 0 0rem 2rem 0;
    }

    &:hover {
        -webkit-box-shadow: 0px 6px 10px -8px #464b4e15;
        box-shadow: 0px 6px 10px -8px #464b4e15;     
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
        background-color: #4F7D96;
        color: white;
    }
    
    svg {
        font-size: 2rem;
        transform: ${props =>
        props.type === 'left-forward' ? 'rotate(-45deg)' :
            props.type === 'right-forward' ? 'rotate(45deg)' :
                props.type === 'left' ? 'rotate(-90deg)' :
                    props.type === 'right' ? 'rotate(90deg)' :
                        props.type === 'left-backward' ? 'rotate(-135deg)' :
                            props.type === 'backward' ? 'rotate(180deg)' :
                                props.type === 'right-backward' ? 'rotate(135deg)' : 'rotate(0)'}
    }
`

const MoveToModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 25vh;
  background: white;
  border-radius: 20px;
`

const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    div {
        margin-bottom: 2rem;
    }

    input {
        padding: 0.25rem 0rem;
        border: none;
        border-bottom: 1px solid #4F7D96;
        font-size: 1rem;
        margin-right: 1.5rem;
        color: #394146;

        &:last-child {
            margin-right: 0;
        }

        &:focus {
            outline: none;
            border-bottom: 1px solid #FE844B;
        }
    }

    button {
        padding: 0.75rem 1.75rem;
        border: none;
        border-radius: 10px;
        outline-color: #4F7D96;
        background: #4F7D96;
        color: white;
        cursor: pointer;
        font-weight: 500;
        transition: all 100ms ease;

        &:hover {
            background: #5388a5;
        }
    }
`

const BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0rem 6rem;
    height: 14vh;
`

const ResetToZero = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    margin-right: 2rem;
    border-radius: 20px;
    color: #B2C7D1;
    height: 14vh;
    cursor: pointer;
    transition: all 100ms ease-in;

    svg {
        margin-bottom: 0.75rem;
    }

    &:hover {
        -webkit-box-shadow: 0px 6px 10px -8px #464b4e15;
        box-shadow: 0px 6px 10px -8px #464b4e15;
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
        background-color: #4F7D96;
        color: white;
    }
`

const ReturnToZero = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 20px;
    color: #B2C7D1;
    height: 14vh;
    cursor: pointer;
    transition: all 100ms ease-in;

    svg {
        margin-bottom: 0.75rem;
    }

    &:hover {
        -webkit-box-shadow: 0px 6px 10px -8px #464b4e15;
        box-shadow: 0px 6px 10px -8px #464b4e15;
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
        background-color: #4F7D96;
        color: white;
        
    }
`

export default Controllers
