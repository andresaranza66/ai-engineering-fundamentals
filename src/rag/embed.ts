import {readFile, readdir} from 'node:fs/promises'
import {join, parse} from 'node:path'
import {fileURLToPath} from 'node:url'
import {getIndex} from './vector-store'


const __filename = fuleURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const CORPUS_DIR = join(__dirname, '..', '..', 'data', 'corpus')

async function main () {
    const index = getIndex({
        UPSTASH_VECTOR_REST_TOKEN : process.env.UPSTASH_VECTOR_REST_TOKEN,
        UPSTASH_VECTOR_REST_URL : process.env.UPSTASH_VECTOR_REST_URL
    })

    console.log('...Helloooo')
    await index.reset()
}

