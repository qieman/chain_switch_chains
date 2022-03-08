import * as fs from 'fs'
import * as path from 'path'

function minify (str: string) {
    return str.replace(/[\n|\s]/g, '').replace(/\r\n/g, '')
}

function combine (fromPath: string, output: string) {
    const files = fs.readdirSync(fromPath)
    let res = ''
    files.forEach((item, index) => {
        const filePath = path.join(fromPath, item)
        try {
            let data = fs.readFileSync(filePath, 'utf-8')
            if (index !== files.length) {
                data
            }
            res = index !== files.length - 1 ? res + data + ',' : res + data
        } catch (e) {
            console.log('fromPath', fromPath)
            console.log('item', item)
            console.error(e)
        }
    })

    res = `[${res}]`
    fs.writeFileSync(path.join(output), res)
    fs.writeFileSync(path.join(output.replace('.json', '.min.json')), minify(res))
}



const chainsPath = path.join('src/chains')
const iconsPath = path.join('src/icons')
combine(chainsPath, 'dist/chains.json')
combine(iconsPath, 'dist/icons.json')


