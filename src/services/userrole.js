import * as req from '../utils/request'

export async function list(){
    let result=await req.get('/api/userrole/list')
    return result
}