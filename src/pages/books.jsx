import MyPage from './MyPage'
import { DatePicker, Table } from 'antd'
import css from './books.less'
import * as  bookService from '../services/books'

class Books extends MyPage {

    state = {
        list: [],
        pagination: {
            pageSize: 10,
            current: 1,
            total: 0,
        },
        loading: false,
    }
    componentDidMount() {
        this.loadData();
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
    loadData = () => {

        this.setState({
            loading: true
        })
        let { pagination } = this.state
        let { pageSize, current } = pagination
        bookService.list(pageSize, current).then(result => {
            pagination.total = result.count
            this.setState({
                list: result.datas,
                loading: false,
                pagination
            })
        })

    }
    render() {
        let i18n = this.i18n
        const columns = [
            {
                title: i18n('booklist.id'),
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: i18n('booklist.bookTitle'),
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: i18n('booklist.bookPrice'),
                dataIndex: 'unitprice',
                key: 'unitprice',
            },
            {
                title: i18n('booklist.bookAuthor'),
                dataIndex: 'author',
                key: 'author',
            },
        ];


        let { list, pagination, loading } = this.state
        return <div className={css.main}>
            <h1>{i18n('booklist.title')}</h1>
            <Table
                rowKey={record => record.id}
                dataSource={list} columns={columns} pagination={pagination} loading={loading}
                onChange={this.onChange}
                bordered />;
        </div>
    }
}
export default Books