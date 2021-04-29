const db = require('../db.js')
const fs = require('fs')

jest.mock('fs')

describe('db', () => {
    afterEach(() => {
        fs.clearMocks()
    })
    it('can read', async () => {
        const data = [{ title: 'hi', done: true }]
        fs.setMockReadFiles('/xxx', null, JSON.stringify(data))
        const list = await db.read('/xxx')
        expect(list).toStrictEqual(data)
    })

    it('can write', async () => {
        let fakeFile
        fs.setMockWriteFiles('/yyy', (path, data, callback) => {
            fakeFile = data
            callback(null)
        })
        const list = [{ title: 'shopping', done: true }, { title: '吃饭', done: false }]
        await db.write(list, '/yyy')
        expect(fakeFile).toBe(JSON.stringify(list) + '\n')
    })
})