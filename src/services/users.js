import * as req from '../utils/request'

export async function list(pageSize,pageIndex){
    let result=await req.get('/api/user/list/'+pageSize+"/"+(pageIndex-1))
    return result
}


export async function update(user){
    let result=await req.postJSON('/api/user/update',user)
    return result
}


export async function add(user){
    let result=await req.postJSON('/api/user/add',user)
    return result
}


export async function del(id){
    let result=await req.get('/api/user/delete/'+id)
    return result
}