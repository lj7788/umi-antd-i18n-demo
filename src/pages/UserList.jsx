import MyPage from './MyPage'
import  css from  './UserList.less'
import * as userService from '../services/users'
import {Table,Icon,Button,message,Modal} from 'antd'
import UserItemDialog from './UserItemDialog'

const { confirm } = Modal;

class UserList extends MyPage{
    state={
        list:[],
        editItem:null,
        loading:false,
        pagination: {
            pageSize: 5,
            current: 1,
            total: 0,
        },
    }
    onChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        setTimeout(() => {
            this.loadData()
        }, 200);
    }
    componentDidMount() {
        this.loadData();
    }

    loadData=()=>{
        this.setState({
            loading:true
        })
        let { pagination } = this.state
        let { pageSize, current } = pagination
        userService.list(pageSize, current).then(result=>{       
            pagination.total = result.count     
            this.setState({
                list:result.datas,
                loading:false,
                pagination
            })
        })
    }

    refUserItemDialog=ref=>{        
        this.userItem=ref
    }

    editItem=it=>{        
        this.userItem.show('edit',it,(e)=>{
            if(e){
                Object.assign(it,e)
                userService.update(it).then(res=>{
                    this.userItem.hide();
                    if(res.code===200){
                        message.success('修改成功!');
                        this.loadData()
                    }else{
                        message.error('修改失败!')
                    }
                })
            }
        });
    }

    deleteItem=it=>{
        let that=this
        confirm({
            title: '警告',
            content: '确定删除当选中用户信息?',            
            okType: 'danger',
            
            onOk() {             
                userService.del(it.id).then(res=>{                    
                    if(res.code===200){
                        message.success('删除成功!');
                        that.loadData()
                    }else{
                        message.error('删除失败!')
                    }
                })
            }
          });
    }
    doAddItem=()=>{       
        let it={
            name:'',address:'',phone:'',mail:'',userstateid:1,isonline:0,loginid:'',loginpwd:'',userroleid:1,gender:1
        }
        this.userItem.show('add',it,e=>{  
            if(!e){
                return;
            }
            Object.assign(it,e)          
            userService.add(it).then(res=>{                
                if(res.code===200){
                    this.userItem.hide();
                    message.success('增加成功!');
                    this.loadData()
                }else{
                    let msg=""
                    let err="增加失败";
                    if(res.err.errors.length>0){
                        msg=res.err.errors[0].message
                    }
                    if(msg.indexOf("ix_users_loginid")>=0){
                        err+=",登录ID必须唯一!"
                    }
                    if(msg.indexOf("ix_users_mail")>=0){
                        err+=",邮箱必须唯一!"
                    }
                    message.error(err)
                }
            });
        });
    }

    render(){
        let i18n = this.i18n
        const columns = [
            {
                title: "编号",
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: "姓名",
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: "地址",
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: "Email",
                dataIndex: 'mail',
                key: 'mail',
            },
            {
                title: "电话",
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: "登录ID" ,
                dataIndex: 'loginid',
                key: 'loginid',
            },
            {
                title: "性别" ,
                dataIndex: 'gender',
                key: 'gender',
                render:text=>{
                    return text===0?<Icon type="man" />:<Icon type="woman" style={{color:'#eb2f96'}}/>
                }
            },
            {
                title: "是否在线" ,
                dataIndex: 'isonline',
                key: 'isonline',
                render:text=>{
                    return text===1?<span className={css.online}>在线</span>:<span className={css.offline}>离线</span>
                }
            },
            {
                title: "角色" ,
                dataIndex: 'userroleid',
                key: 'userroleid',
                render:(text,row)=>{
                    return row.userrole.name
                }
            },
            {
                title: "状态" ,
                dataIndex: 'userstateid',
                key: 'userstateid',
                render:(text,row)=>{
                    return row.userstate.name
                }
            },
            {
                title: "操作" ,
                render:(text,row)=>{
                    return <div className="toolbar">
                        <Button onClick={()=>this.editItem(row)}>修改</Button>
                        <Button onClick={()=>this.deleteItem(row)}>删除</Button>
                    </div>
                }
            },
        ];
        let {list,loading,pagination}=this.state
        return <div className={css.userlist}>
            <h1 className={css.header}>User List</h1>
            <div className="toolbar">
            <Button onClick={this.doAddItem}>增加</Button>            
            </div>
            <Table
                rowKey={record => record.id}
                pagination={pagination}
                onChange={this.onChange}
                dataSource={list} columns={columns} loading={loading}                
                bordered />
            <UserItemDialog onRef={this.refUserItemDialog}/>
        </div>
    }
}

export default UserList