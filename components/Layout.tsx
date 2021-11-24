import { NextPage } from 'next'
import Navbar from './Navbar/Navbar'
import Bottom from './Bottom/Bottom'

const Layout: NextPage = (props): JSX.Element => {
  const { children } = props
  return (
    <>
      <Navbar />
      {/* paddingTop: Navbar의 높이와 같은 크기로 지정할 것 */}
      <main style={{ paddingTop: '100px' }}>{children}</main>
      <Bottom />
    </>
  )
}

export default Layout
