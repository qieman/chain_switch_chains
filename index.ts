import * as fs from 'fs'
import * as path from 'path'

function minify (str: string) {
    return str.replace(/[\n]/g, '').replace(/\r\n/g, '')
}

function combineChain (fromPath: string, output: string) {
    const files = fs.readdirSync(fromPath)
    let res = ''
    files.forEach((item, index) => {
        const filePath = path.join(fromPath, item)
        try {
            let data = fs.readFileSync(filePath, 'utf-8')
            res = index !== files.length - 1 ? res + data + ',' : res + data
        } catch (e) {
            console.log('fromPath', fromPath)
            console.log('item', item)
            console.error(e)
        }
    })

    res = `[${res}]`
    fs.writeFileSync(path.join(output), res)
    //fs.writeFileSync(path.join(output.replace('.json', '.min.json')), minify(res))
}


function combineIcons(fromPath: string, output: string) {
    const files = fs.readdirSync(fromPath)
    let res = ''
    files.forEach((item, index) => {
        const filePath = path.join(fromPath, item)
        try {
            let data = fs.readFileSync(filePath, 'utf-8')
            let dataJson = JSON.parse(data)
            const key = item.replace('.json', '')
            let string = `"${key}": "${dataJson[0].url}"`
            res = index !== files.length - 1 ? res + string + ',' : res + string
        } catch (e) {
            console.log('fromPath', fromPath)
            console.log('item', item)
            console.error(e)
        }
    })

    res = `{${res}}`
    fs.writeFileSync(path.join(output), res)
}

const chainsPath = path.join('src/chains')
const iconsPath = path.join('src/icons')
combineChain(chainsPath, 'dist/chains.json')
combineIcons(iconsPath, 'dist/icons.json')



