
import { shallow } from 'enzyme'
import Index from '../pages/index'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('ReactComponent',()=>{
  it('index',async()=>{
    const index = shallow(<Index />)
    index.state('name')
  });
})
