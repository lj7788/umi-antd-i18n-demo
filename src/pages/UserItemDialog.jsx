import My from './MyPage'
import react from 'react'
import { Modal, Button, Form, Input, Col, Row, Radio,Select } from 'antd';
import * as userRoleService from '../services/userrole'
import * as userStateService from '../services/userstate'
const { Option } = Select;
class UserItemForm extends react.Component {
    state={
        userroles:[],
        userstates:[]
    }

    componentDidMount() {
        this.props.onRef(this)
        userRoleService.list().then(roles=>{
            this.setState({
                userroles:roles
            })
        })
        userStateService.list().then(states=>{
            this.setState({
                userstates:states
            })
        })
    }
    handleSubmit = (cb) => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                if (cb) {
                    cb(null)
                }
                return;
            }
            if (cb) {
                cb(fieldsValue)
            }
        })
    }
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('loginpwd')) {
            callback('确认密码不一致!');
        } else {
            callback();
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        let pwdRule = [
            {
                required: true,
                message: '密码不能为空!',
            },
        ]
        let pwd2Rule = [
            {
                required: true,
                message: '确认密码不能为空!',
            },
            {
                validator: this.compareToFirstPassword,
            }
        ]
        let stateEl=''
        //修改状态时密码不是必须输入的         
        if (this.props.opt === 'edit') {
            pwdRule = []
            pwd2Rule = [{
                validator: this.compareToFirstPassword,
            }]
            let states=this.state.userstates.map(it=><Option value={it.id}  key={it.id}>{it.name}</Option>)

            stateEl= <Col span={12}>
            <Form.Item label="状态">
                {getFieldDecorator('userstateid', {
                    rules: [
                        {
                            required: true,
                            message: '状态不能为空!',
                        },                               
                    ],
                })(<Select>{states}</Select>)}
            </Form.Item>
        </Col>
        }

        let roles=this.state.userroles.map(it=><Option value={it.id} key={it.id}>{it.name}</Option>)
        
        return <Form {...formItemLayout} >
            <Row>
                <Col span={12}>
                    <Form.Item label="姓名">
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '姓名不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="地址">
                        {getFieldDecorator('address', {
                            rules: [
                                {
                                    required: true,
                                    message: '地址不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Form.Item label="电话">
                        {getFieldDecorator('phone', {
                            rules: [
                                {
                                    required: true,
                                    message: '电话不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('mail', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'E-mail格式不正确!',
                                },
                                {
                                    required: true,
                                    message: 'E-mail不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item label="登录ID">
                        {getFieldDecorator('loginid', {
                            rules: [
                                {
                                    required: true,
                                    message: '登录ID不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="性别">
                        {getFieldDecorator('gender')(
                            <Radio.Group>
                                <Radio value={0}>男</Radio>
                                <Radio value={1}>女</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item label="密码">
                        {getFieldDecorator('loginpwd', {
                            rules: pwdRule,
                        })(<Input.Password />)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="确认密码">
                        {getFieldDecorator('loginpwd2', {
                            rules: pwd2Rule
                        })(<Input.Password />)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item label="角色">
                        {getFieldDecorator('userroleid', {
                            rules: [
                                {
                                    required: true,
                                    message: '角色不能为空!',
                                },
                            ],
                        })(
                            <Select>{roles}</Select>
                        )}
                    </Form.Item>
                </Col>
                {stateEl}
            </Row>
        </Form>

    }
}


class UserItemDialog extends react.PureComponent {
    state = {
        callback: null,
        user: null,
        opt: 'add',
        visible: false
    }
    componentDidMount() {
        this.props.onRef(this)
    }

    handleOk = () => {
        this.form.handleSubmit(this.state.callback);
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    hide=()=>{
        this.setState({
            visible: false
        })
    }
    show = (opt, data, callback) => {
        this.setState({
            callback: callback,
            user: data,
            opt: opt,
            visible: true
        })
    }

    onRef = ref => {
        this.form = ref
    }
    render() {
        const user = this.state.user
        const ItemForm = Form.create({
            name: 'userItem', displayName: "userItem",
            mapPropsToFields(props) {
                let obj = {}
                for (let key in user) {
                    obj[key] = Form.createFormField({
                        value: user[key]
                    })
                }
                console.log(obj)
                return obj
            }
        })(UserItemForm)
        return <Modal
            width={600}
            title={this.state.opt === 'add' ? '增加用户' : '修改用户'}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}>
            <ItemForm onRef={this.onRef} user={this.state.user} opt={this.state.opt}></ItemForm>
        </Modal>
    }
}

export default UserItemDialog