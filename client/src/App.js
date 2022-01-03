import GlobalStyle from './styles/GlobalStyle'
import styled from 'styled-components'
import Visualizer from './components/Visualizer'
import Controllers from './components/Controllers'
import Actions from './components/Actions'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ToastContainer newestOnTop />
      <Container>
        <TopWrapper>
          <MainPanel>
            <Actions />
            <Visualizer />
          </MainPanel>
          <Controllers />
        </TopWrapper>
      </Container>
    </>
  )
}

const Container = styled.div`
  padding: 9rem 15rem 7rem 15rem;
`

const MainPanel = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 1rem;
`

const TopWrapper = styled.div`
  display: flex;
  width: 100%;
`

export default App
