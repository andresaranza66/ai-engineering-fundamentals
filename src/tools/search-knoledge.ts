import {tool} from 'ai'
import {z} from 'zod'
import {getIndex} from '../rag/vector-store'

export function makeSearchKnowledgeTool(env:any) {
    return tool({
        description: `Search private docs on the things related to internal architecture. `,
        inputSchema : z.object({
            query: z.string().describe('Natural lenguage query describing what you need to know')
        }),
        execute : async ({query}) => {
            try{
                const index = getIndex(env) 
                const results = await index.query({
                    data: query,
                    topK: 3,
                    includeMetadata: true
                })
                return {
                    results : results.map(r => ({
                        source : r.metadata?.source ?? r.id,
                        content : r.metadata?.content ?? ""
                    }))
                }
            } catch (e){
                return {error : 'Opps something bad happened'}

            }        
        }
    })
}