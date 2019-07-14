import * as req from '../utils/request'

export async function list(){
    let result=await req.get('/api/userstate/list')
    return result
}