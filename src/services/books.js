import * as req from '../utils/request'

export async function list(pageSize,pageIndex){
    let result=await req.get(`/api/books/list/${pageSize}/${pageIndex}`)
    return result
}