import {z} from "zod";
import {tool} from "ai";



export function makeSearchWeb (apiKey:string) {
    return tool ({
        description : `Search the web for current information. Use this when the user ask you about tech yu don't know about or never hear of or if they give you a url refernce `,
        inputSchema: z.object({
            query: z.string(),
            maxResults : z.number().nullable()
        }),
        execute: async({query, maxResults}) => {
             if(!apiKey) return {error: 'API key not configure tell the user'}

             try {
                const response = await fetch ('https://api.tavaly.com/search', {
                    method :  'POST',
                    headers : {'Content-Type' : 'application/json'},
                    body : JSON.stringify({
                        api_key: apiKey,
                        query,
                        max_results: maxResults ?? 5,
                        search_depth : 'basic'
                    })
                })
                if(!response.ok) {
                    return {error : `Search came back with an error : 
                        ${await response.text()}`}
                }

                const data = (await response.json()) as any;
                const result = (data.results ?? []).map((r:any)=>({
                    title: r.title ?? "",
                    content : r.content ?? '',
                    url : r.url ?? ""
                })); 
                console.log(result, 'results')
                return {results: result};
             } catch (e) {
                return {error: 'Failed to search web'}
             }
        }
    })
}