
import { shallow } from 'enzyme'
import Index  from '../src/pages/index/index'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('ReactComponent',()=>{
  it('index',async()=>{
    index = shallow(<Index / >);
    index.state('View')
  });
})
