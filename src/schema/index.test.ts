import Schemas from './index'

describe('index', () => {
  it('Should validate if this module returns the correct value', async () => {
    expect(Schemas).toHaveLength(6)
  })
})
